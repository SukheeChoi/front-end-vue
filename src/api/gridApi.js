import _ from 'lodash';
import restApi from '@/api/restApi.js';
import utils from '@/utils/commUtils.js';
import ValidatorTypes from '@/utils/commVTypes.js';
import { CollectionView } from '@grapecity/wijmo';

export class GridApi extends CollectionView {
  _id = '';
  _uri = '';
  _qry = {};
  _opt = {};
  _model = '';
  _values = [];
  _orgValues = [];
  _newValues = [];
  _vm = null;
  _gridView = null;
  _storeChain = [];
  _keyValues = null;
  _isDetail = false;

  constructor(uri, model, id = '') {
    super([], { trackChanges: true });
    this._id = id;
    this._uri = uri;
    this._model = model;
    this._newValues = model ? utils.copyDefaultValues(model) : null;
  }

  addQueryChain(stores) {
    this._storeChain = stores;
  }

  init(
    vm,
    grid,
    qry = null,
    opt = null
    // , autoLoading = true
  ) {
    this._vm = vm;
    this._gridView = grid;
    // grid.cellEditEnding.addHandler(this.valid);

    if (qry == null) {
      qry = this._vm.query;
    }

    if (opt == null) {
      opt = this._vm.paging;
    }

    this._qry = qry;
    this._opt = opt;

    // if (autoLoading) {
    // this.getList();
    // }
  }

  clearData() {
    this.clearChanges();

    this._values = [];
    this._orgValues = [];
    this._newValues = [];
    this.sourceCollection = [];
  }

  setKeyValues(keyValues) {
    this._isDetail = true;
    this._keyValues = keyValues;
  }

  copyKeyValues(dataItem) {
    return utils.copyKeyValues(dataItem, this._model);
  }

  undo() {
    this.clearChanges();
    this.sourceCollection = _.cloneDeep(this._orgValues);
  }

  getList = async (query = {}, paging = {}, self) => {
    if (!_.isEmpty(query)) {
      this._qry = query;
    }
    if (!_.isEmpty(paging)) {
      this._opt = paging;
    }

    const {
      data: { data: items, totalCount, code },
    } = await restApi.getList(
      this._uri,
      {
        ...query,
        ...paging,
      },
      this._id
    );

    if (code == 'OK') {
      if (this._storeChain.length > 0) {
        var dataItem = null;

        if (items.length > 0) {
          dataItem = items[0];
        }

        this.chainQuery(dataItem);
      }

      let applyVm = this._vm;

      if (!this._vm.applier) {
        applyVm = this._vm.grid;
      }

      if (self) {
        applyVm.applier({
          query,
          paging,
          totalCount,
          items,
        });
        return;
      }
    }

    return {
      query,
      paging,
      totalCount,
      items,
    };
  };

  chainQuery(dataItem) {
    if (dataItem == null || dataItem.rowStatus == 'C') {
      for (var store of this._storeChain) {
        store.clearData();
        store.setKeyValues(null);
      }

      return;
    }

    let qryData = utils.copyKeyValues(dataItem, this._model);

    for (var store of this._storeChain) {
      store.setKeyValues(qryData);
      store.getList(1, qryData);
    }
  }

  save = async (addItems, editItems) => {
    const saveUri = this._uri;
    const {
      data: { code },
    } = await restApi.save(saveUri, [...addItems, ...editItems]);

    if (code == 'OK') {
      return code === 'OK';
    }
  };

  remove = async (removeItems) => {
    const removeUri = this._uri;
    const {
      data: { code },
    } = await restApi.removeList(removeUri, [...removeItems]);
    return code === 'OK';
  };

  valid(grid, e) {
    let col = grid.columns[e.col];
    let fields = grid.itemsSource._model.fields;
    let index = fields.findIndex((field) => field.id === col.binding);
    let field = fields[index];

    if (field.vType) {
      let result = ValidatorTypes[field.vType + 'Validator'](grid.activeEditor.value, field);

      if (!result.isValid) {
        e.cancel = true;
        e.stayInEditMode = true;

        let edtHandler = grid._edtHdl;
        let rng = edtHandler._rng;
        let cell = grid.cells.getCellElement(rng.row, rng.col);

        if (cell) {
          edtHandler._setCellError(cell, result.message);
        }

        return;
      }
    }

    GridApi.markRecordStatus(grid, e);
  }
}