import _ from 'lodash';
import restApi from '@/api/restApi.js';
import { CollectionView } from '@grapecity/wijmo';

export class GridApi extends CollectionView {
    _id = '';
    _uri = '';
    _model = '';
    _values = [];
    _vm = null;

    constructor(uri, model, id = '') {
        super([], { trackChanges: true });
        this._id = id;
        this._uri = uri;
        this._model = model;
    }

    setInstance(vm) {
        this._vm = vm;
    }

    async getRowCount() {
        return this.items.length;
    }

    async getList(qry = {}, opt = {}) {
        let _opt = {};

        if (opt.pageNo && opt.pageSize) {
            _opt = {
                pageNo: opt.pageNo,
                pageSize: opt.pageSize,
            };
        }

        let resData = await restApi.getList(this._uri, Object.assign(qry, _opt), this._id);
        this.sourceCollection = resData.data.data;
    }

    add() {
        let addData = _.cloneDeep(this._model);
        addData.rowStatus = 'C';

        this.sourceCollection.splice(0, 0, addData);
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
            this.remove(value);
        }

        if (this.itemsRemoved.length > 0) {
            for (let i = 0; i < this.itemsRemoved.length; i++) {
                delList.push(this.itemsRemoved.at(i));
            }
        }

        if (delList.length > 0) {
            this.refreshQuery(await restApi.removeList(this._uri, delList, this._id));
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
                this.getList();
            } else {
                await this._vm.alert(resData.data.message);
            }
        }
    }

    cellEditEnding(view, e) {
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

    validation() {
        alert('');
    }
}