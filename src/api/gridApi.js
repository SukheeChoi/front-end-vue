import _ from 'lodash';
import restApi from '@/api/restApi.js';
import utils from '@/utils/commUtils.js';
import ValidatorTypes from '@/utils/commVTypes.js';
import { CollectionView, hasClass, addClass, removeClass } from '@grapecity/wijmo';
import * as gridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjGrid from '@grapecity/wijmo.grid';

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
    this._newValues = utils.copyDefaultValues(model);
  }

  addQueryChain(stores) {
    this._storeChain = stores;
  }

  init(vm, grid, qry = null, opt = null, autoLoading = true) {
    this._vm = vm;
    this._gridView = grid;
    grid.cellEditEnding.addHandler(this.valid);
    this.formatItem(grid);

    if (qry == null) {
      qry = this._vm.qry;
    }

    if (opt == null) {
      opt = this._vm.opt;
    }

    this._qry = qry;
    this._opt = opt;

    if (autoLoading) {
      this.getList();
    }
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

  mergePagingParams(pageNo = -1, pageSize = -1) {
    let opt = {};

    if (pageNo > 0) {
      this._opt.pageNo = pageNo;
    }

    if (pageSize > 0) {
      this._opt.pageSize = pageSize;
    }

    if (this._opt.pageNo && this._opt.pageSize) {
      opt = {
        pageNo: this._opt.pageNo,
        pageSize: this._opt.pageSize,
      };
    }

    return opt;
  }

  async getList(pageNo = -1, qry = null, pageSize = -1) {
    let opt = this.mergePagingParams(pageNo, pageSize);

    if (qry != null) {
      this._qry = Object.assign(this._qry, qry);
    }

    let resData = await restApi.getList(this._uri, Object.assign(this._qry, opt), this._id);

    if (resData.data.code == 'OK') {
      this._orgValues = _.cloneDeep(resData.data.data);
      this.sourceCollection = resData.data.data;
      this._opt.totalCount = resData.data.totalCount;

      if (this._storeChain.length > 0) {
        var dataItem = null;

        if (this.sourceCollection.length > 0) {
          dataItem = this.sourceCollection[0];
        }

        this.chainQuery(dataItem);
      }
    } else {
      await this._vm.alert(resData.data.message);
    }
  }

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

  add() {
    if (this._isDetail && this._keyValues == null) {
      this._vm.alert(this._model.title + ' 자료 입력중입니다.');
      return;
    }

    let addData = _.cloneDeep(this._newValues);

    if (this._keyValues != null) {
      addData = Object.assign(addData, this._keyValues);
    }

    if (this._gridView.newRowAtTop) {
      this.sourceCollection.splice(0, 0, addData);
    } else {
      this.sourceCollection.push(addData);
    }

    this.itemsAdded.push(addData);
    this.refresh();
  }

  async del() {
    if (this._isDetail && this._keyValues == null) {
      this._vm.alert(this._model.title + ' 자료 입력중입니다.');
      return;
    }

    if (this._values.length == 0) {
      this._vm.alert('삭제할 자료를 선택하세요.');
      return;
    }

    const ok = await this._vm.confirm('선택하신 자료를 삭제하시겠습니까?');

    if (!ok) {
      return;
    }

    let delList = [];

    for (let value of this._values) {
      if (value.rowStatus != 'C') {
        delList.push(value);
      }
    }

    if (delList.length > 0) {
      this.refreshQuery(await restApi.removeList(this._uri, delList, this._id));
    } else {
      for (let value of this._values) {
        if (value.rowStatus == 'C') {
          this.remove(value);
        }
      }
    }
  }

  async save() {
    if (this._isDetail && this._keyValues == null) {
      this._vm.alert(this._model.title + ' 자료 입력중입니다.');
      return;
    }

    if (this.itemsAdded.length + this.itemsEdited.length == 0) {
      this._vm.alert('신규로 추가된 자료나 수정된 자료가 없습니다.');
      return;
    }

    const ok = await this._vm.confirm('수정 혹은 추가된 자료를 저장하시겠습니까?');
    if (!ok) {
      return;
    }

    let saveList = [];

    if (this.itemsAdded.length > 0) {
      for (let i = 0; i < this.itemsAdded.length; i++) {
        saveList.push(this.itemsAdded.at(i));
      }
    }

    if (this.itemsEdited.length > 0) {
      for (let i = 0; i < this.itemsEdited.length; i++) {
        saveList.push(this.itemsEdited.at(i));
      }
    }

    this.refreshQuery(await restApi.save(this._uri, saveList, this._id));
  }

  clear() {
    this.clearData();
    const newItem = new this.constructor(this._uri, this._model, this._id);
    newItem.init(this._vm, this._gridView);
  }

  async refreshQuery(resData) {
    if (resData.data) {
      if (resData.data.code == 'OK') {
        await this.getList();
      } else {
        await this._vm.alert(resData.data.message);
      }
    }
  }

  static markRecordStatus(grid, e) {
    const oldVal = grid.getCellData(e.row, e.col, true),
      newVal = grid.activeEditor.value;

    if (grid.getCellData(e.row, 'rowStatus') == 'C') {
      return;
    }

    if (oldVal == newVal) {
      return;
    }

    grid.setCellData(e.row, 'rowStatus', 'U');
  }

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

  static alignHeader(e) {
    if (hasClass(e.cell, 'wj-header')) {
      addClass(e.cell, 'wj-align-center');
    }
  }

  formatItem(grid) {
    if (grid.allowDragging != 0) {
      //None
      grid.rowHeaders.columns[0].binding = 'drag';
      grid.rowHeaders.columns[0].header = ' ';
    } else {
      grid.rowHeaders.columns[0].binding = 'rowStatus';
      grid.rowHeaders.columns[0].header = ' ';
    }

    grid.formatItem.addHandler(function (s, e) {
      let col = e.panel.columns[e.col],
        row = e.panel.rows[e.row],
        binding = grid.columns[e.col].binding,
        colHeader = grid.rowHeaders.columns[e.col];

      GridApi.alignHeader(e);

      if (e.panel.cellType == wjGrid.CellType.RowHeader) {
        if (colHeader.binding == 'rowStatus') {
          e.cell.innerHTML = '';
          let html =
            '' +
            '<button class="ow-btn type-icon">' +
            '<span class="' +
            (row.dataItem.rowStatus == 'U'
              ? 'wj-glyph-pencil'
              : row.dataItem.rowStatus == 'C'
              ? 'wj-glyph-asterisk'
              : '') +
            '">' +
            '</span>' +
            '</button>' +
            '';
          e.cell.innerHTML = html;
        }
        if (colHeader.binding == 'drag') {
          e.cell.innerHTML = '';
          // add buttons
          let html =
            '' +
            '<button class="wj-btn wj-btn-glyph">' +
            '<span class="' +
            'wj-glyph-drag' +
            '">' +
            '</span>' +
            '</button>' +
            '';
          e.cell.innerHTML = html;
        }
      }
    });
  }
}
