import _ from 'lodash';
import restApi from '@/api/restApi.js';
import { CollectionView } from '@grapecity/wijmo';
import OwModal from '@/components/common/OwModal';

export class GridApi extends CollectionView {
    _id = '';
    _uri = '';
    _model = '';
    _values = [];

    constructor(uri, model, id = '') {
        super([], { trackChanges: true });
        this._id = id;
        this._uri = uri;
        this._model = model;
    }

    async getRowCount() {
        return this.items.length;
    }

    async getList(qry = {}, paging = {}) {
        let opt = paging;
        let reqData = await restApi.getList(this._uri, Object.assign(qry, opt), this._id);

        opt.totalCount = reqData.data.data.body.totalCount;

        console.log('reqData', reqData);
        console.log('opt.totalCount', opt.totalCount);

        this.sourceCollection = reqData.data.data.body.data;

        return opt.totalCount;
    }

    add() {
        let addData = _.cloneDeep(this._model);
        addData.rowStatus = 'C';

        this.sourceCollection.splice(0, 0, addData);
        this.itemsAdded.push(addData);
        this.refresh();
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