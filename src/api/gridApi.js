import _ from 'lodash';
import restApi from '@/api/restApi.js';
import { CollectionView } from '@grapecity/wijmo';

export class GridApi extends CollectionView {
    _id = '';
    _uri = '';
    _model = '';
    _values = [];
    _oldVal = null;
    _currentRow = 0;

    constructor(uri, model, id = '') {
        super([], { trackChanges: true });
        this._id = id;
        this._uri = uri;
        this._model = model;
    }

    getRowCount() {
        return this.items.length;
    }

    getList(qry = {}, paging = {}) {
        let opt = paging;

        if (paging.pageNo) {
            opt = {
                pageNo: paging.pageNo,
                pageSize: paging.pageSize,
            };
        }

        let reqData = restApi.getList(this._uri, Object.assign(qry, opt), this._id);

        if (reqData && reqData.data.length > 0) {
            this.clear();
            this.push(reqData.data);
        }
    }

    addRow() {
        let addData = _.cloneDeep(this._model);
        addData.rowStatus = 'C';

        this.addNew(addData);
        this.commitNew();
    }

    delRow() {
        if (this._values.length == 0) {
            alert('먼저 삭제할 자료를 선택하시기 바랍니다.');
            return;
        }

        if (!confirm('선택하신 자료를 삭제하시겠습니까?')) {
            return;
        }

        let delList = [];

        for (let value of this._values) {
            if (value.rowStatus != 'C') {
                delList.push(value);
            }
        }

        if (delList.length == 0) {
            for (let value of this._values) {
                if (value.rowStatus == 'C') {
                    this.remove(value);
                }
            }

            alert('저장되지 않은 추가된 자료만 삭제되었습니다.');
            return;
        }

        restApi.removeList(this._uri, delList, this._id);
    }

    save() {
        if (this.itemsAdded.length + this.itemsEdited.length == 0) {
            alert('신규로 추가된 자료나 수정된 자료가 없습니다.');
            return;
        }

        if (!confirm('수정 혹은 추가된 자료를 저장하시겠습니까?')) {
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

        restApi.saveList(this._uri, saveList, this._id);
    }

    rowChanged(view, e) {
        this._currentRow = view.selection.row;
        this._oldVal = String(view.getCellData(e.row, e.col));
    }

    rowEditEnding(view, e) {
        if (this.sourceCollection[this._currentRow].rowStatus == 'C') {
            return;
        }

        let newVal = String(view.getCellData(e.row, e.col));

        if (this._oldVal == newVal) {
            return;
        }

        let updateData = this.itemsEdited;
        this.sourceCollection[this._currentRow].rowStatus = 'U';
        this.editItem(updateData);
        this.commitEdit();
    }

    validation() {
        alert('');
    }
}