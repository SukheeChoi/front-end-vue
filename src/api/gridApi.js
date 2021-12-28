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

    // async getData() {
    //     const totalCount = 1999;

    //     const data = [];
    //     for (let i = 0; i <= totalCount; i++) {
    //         // for(let i=startIndex; i<=endIndex; i++){
    //         data.push({
    //             systemDiv: 'SYSTEM_' + String(i).padStart(4, '0'),
    //             bizCd: 'BIZCODE_' + String(i).padStart(4, '0'),
    //             bizGrpId: '',
    //             bizGrpNm: '',
    //             bizGrpDesc: '',
    //             useYn: 'Y',
    //         });
    //     }

    //     return {
    //         totalCount,
    //         data,
    //     };
    // }

    // async getList() {
    //     // setTimeout(() => restApi.getList('http://localhost:8000'), 3000);

    //     const { data } = await this.getData();
    //     // console.log('push완료', data);
    //     setTimeout(() => this.push(data), 3000);
    //     // this.result.sourceCollection = data;
    // }

    getList(qry = {}, paging = {}) {
        let opt = paging;

        if (paging.pageNo) {
            opt = {
                pageNo: paging.pageNo,
                pageSize: paging.pageSize,
            };
        }

        let reqData = restApi.getList(this._uri, Object.assign(qry, opt));

        if (reqData && reqData.data.length > 0) {
            this.clear();
            this.push(reqData.data);
        }
    }

    addRow() {
        let addData = _.cloneDeep(this._model);
        addData.rowState = 'C';

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
            if (value.rowState != 'C') {
                delList.push(value);
            }
        }

        if (delList.length == 0) {
            for (let value of this._values) {
                if (value.rowState == 'C') {
                    this.remove(value);
                }
            }

            alert('저장되지 않은 추가된 자료만 삭제되었습니다.');
            return;
        }

        restApi.removeList(this._uri, delList);
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

        restApi.saveList(this._uri, saveList);
    }

    rowChanged(view, e) {
        this._currentRow = view.selection.row;
        this._oldVal = String(view.getCellData(e.row, e.col));
    }

    rowEditEnding(view, e) {
        if (this.sourceCollection[this._currentRow].rowState == 'C') {
            return;
        }

        let newVal = String(view.getCellData(e.row, e.col));

        if (this._oldVal == newVal) {
            return;
        }

        let updateData = this.itemsEdited;
        this.sourceCollection[this._currentRow].rowState = 'U';
        this.editItem(updateData);
        this.commitEdit();
    }

    validation() {
        alert('');
    }
}