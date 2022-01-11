import _ from 'lodash';
import restApi from '@/api/restApi.js';
import utils from '@/utils/commUtils.js';
import ValidatorTypes from '@/utils/commVTypes.js';
import { CollectionView, closest } from '@grapecity/wijmo';
import { Control } from '@grapecity/wijmo.grid';

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

    constructor(uri, model, id = '') {
        super([], { trackChanges: true });
        this._id = id;
        this._uri = uri;
        this._model = model;
        this._newValues = utils.copyDefaultValues(model);
    }

    init(vm, view, qry = null, opt = null, autoLoading = true) {
        this._vm = vm;
        this._gridView = view;
        view.cellEditEnding.addHandler(this.valid);

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

    undo() {
        this.clearChanges();
        this.sourceCollection = _.cloneDeep(this._orgValues);
    }

    async getList(pageNo = -1, pageSize = -1) {
        let opt = {};

        if (pageNo > 0) {
            this._opt.pageNo = pageNo;
            this._opt.pageSize = pageSize;
        }

        if (this._opt.pageNo && this._opt.pageSize) {
            opt = {
                pageNo: this._opt.pageNo,
                pageSize: this._opt.pageSize,
            };
        }

        let resData = await restApi.getList(this._uri, Object.assign(this._qry, opt), this._id);

        if (resData.data.code == "OK") {
            this._orgValues = _.cloneDeep(resData.data.data);
            this.sourceCollection = resData.data.data;
            this._opt.totalCount = resData.data.totalCount;
        } else {
            await this._vm.alert(resData.data.message);
        }
    }

    add() {
        let addData = _.cloneDeep(this._newValues);

        if (this._gridView.newRowAtTop) {
            this.sourceCollection.splice(0, 0, addData);
        } else {
            this.sourceCollection.push(addData);
        }

        this.itemsAdded.push(addData);
        this.refresh();
    }

    async del() {
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

    async refreshQuery(resData) {
        if (resData.data) {
            if (resData.data.code == "OK") {
                await this.getList();
            } else {
                await this._vm.alert(resData.data.message);
            }
        }
    }

    static markRecordStatus(view, e) {
        const oldVal = view.getCellData(e.row, e.col),
            newVal = view.activeEditor.value;

        if (view.getCellData(e.row, 'rowStatus') == 'C') {
            return;
        }

        if (oldVal == newVal) {
            return;
        }

        view.setCellData(e.row, 'rowStatus', 'U');
    }

    valid(view, e) {
        let col = view.columns[e.col];
        let fields = view.itemsSource._model.fields;
        let index = fields.findIndex((field) => field.id === col.binding);
        let field = fields[index];

        if (field.vType) {
            let result = ValidatorTypes[field.vType + 'Validator'](view.activeEditor.value, field);

            if (!result.isValid) {
                e.cancel = true;
                e.stayInEditMode = true;

                let edtHandler = view._edtHdl;
                let rng = edtHandler._rng;
                let cell = view.cells.getCellElement(rng.row, rng.col);

                if (cell) {
                    edtHandler._setCellError(cell, result.message);
                }

                return;
            }
        }

        GridApi.markRecordStatus(view, e);
    }
}