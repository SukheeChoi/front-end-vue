import _ from 'lodash';
import restApi from '@/api/restApi.js';
import { CollectionView } from '@grapecity/wijmo';

export class GridApi extends CollectionView {
    _id = '';
    _uri = '';
    _model = '';
    _values = [];
    _oldVal = null;
    // _currentRow = 0;

    constructor(uri, model, id = '') {
        super([], { trackChanges: true });
        this._id = id;
        this._uri = uri;
        this._model = model;
    }

    getRowCount() {
        return this.items.length;
    }

    async getData() {
        const totalCount = 10;

        const data = [];
        for (let i = 0; i <= totalCount; i++) {
            // for(let i=startIndex; i<=endIndex; i++){
            data.push({
                systemDiv: 'SYSTEM_' + String(i).padStart(4, '0'),
                bizCd: 'BIZCODE_' + String(i).padStart(4, '0'),
                bizGrpId: '',
                bizGrpNm: '',
                bizGrpDesc: '',
                useYn: 'Y',
            });
        }

        return {
            totalCount,
            data,
        };
    }

    async getList() {
        // setTimeout(() => restApi.getList('http://localhost:8000'), 3000);

        const { data } = await this.getData();
        this.sourceCollection = data;
        // setTimeout(() => this.push(data), 3000);
        // this.result.sourceCollection = data;
    }

    // getList(qry = {}, paging = {}) {
    //     let opt = paging;

    //     if (paging.pageNo) {
    //         opt = {
    //             pageNo: paging.pageNo,
    //             pageSize: paging.pageSize,
    //         };
    //     }

    // let reqData = restApi.getList(this._uri, Object.assign(qry, opt), this._id);

    //     if (reqData && reqData.data.length > 0) {
    //         this.clear();
    //         this.push(reqData.data);
    //     }
    // }

    add() {
        let addData = _.cloneDeep(this._model);
        addData.status = 'C';
        this.addNew(addData);
        this.commitNew();
    }

    del() {
        if (this._values.length == 0) {
            alert('삭제할 자료를 선택하세요.');
            return;
        }

        if (!confirm('선택하신 자료를 삭제하시겠습니까?')) {
            return;
        }

        let delList = [];

        for (let value of this._values) {
            //remove가 실행되어야 itemsRemoved에 데이터가 쌓인다.
            this.remove(value);
        }

        if (this.itemsRemoved.length > 0) {
            for (let i = 0; i < this.itemsRemoved.length; i++) {
                delList.push(this.itemsRemoved.at(i));
            }
        }

        if (delList.length > 0) {
            restApi.removeList(this._uri, delList, this._id);
        }
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

    cellEditEnding(view, e) {
        const oldVal = view.getCellData(e.row, e.col),
            newVal = view.activeEditor.value;

        if (view.getCellData(e.row, 'status') == 'C') {
            return;
        }

        if (oldVal == newVal) {
            return;
        }
        view.setCellData(e.row, 'status', 'U');
    }

    validation() {
        alert('');
    }
}