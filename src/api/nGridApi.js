import _ from 'lodash';
import restApi from '@/api/restApi.js';
import GridApi from '@/api/gridApi.js';
import utils from '@/utils/commUtils.js';

export class NGridApi {
    _uri = '';
    _qry = {};
    _opt = {};
    _values = [];
    _orgValues = [];
    _vm = null;
    _stores = [];

    constructor(stores, uri, model = null, id = '') {
        this._id = id;
        this._uri = uri;
        this._part = stores.length;
        this._stores = stores;
        this._model = model;
        this._newValues = model ? utils.copyDefaultValues(model) : null;
    }

    init(vm, qry = null, opt = null, autoLoading = true) {
        this._vm = vm;

        if (qry == null) {
            qry = this._vm.qry;
        }

        if (opt == null) {
            opt = this._vm.opt;
        }

        this._qry = qry;
        this._opt = opt;

        if (autoLoading) {
            this.getList(qry, opt);
        }
    }

    initPart(grid, store) {
        grid.cellEditEnding.addHandler(store.valid);
        store.setReadOnly(grid);

        store.itemsAdded.collectionChanged.addHandler((c, e) => {
          utils.setDefaultValues(e.item, this._model);
        });
    }

    getStore(index) {
        if (index > this._part) {
            return null;
        }

        this._stores[index] = new GridApi(this._uri, this._model, this._id);

        return this._stores[index];
    }

    clearData() {
        for (var store of this._stores) {
            store.clearData();
        }
    }

    undo() {
        for (var store of this._stores) {
            store.undo();
        }
    }

    async getList(query = {}, paging = {}) {
        if (!_.isEmpty(query)) {
          this._qry = query;
        }

        if (!_.isEmpty(paging)) {
          this._opt = Object.assign(this._opt, paging);
        }

        let nPaging = _.cloneDeep(this._opt);
        nPaging.pageSize = nPaging.pageSize * this._part;

        let resData = await restApi.getList(this._uri, {...query, ...nPaging}, this._id);

        if (resData.data.code == 'OK') {
            let start = 0,
                end = this._opt.pageSize;
            let data = resData.data.data;
            this._orgValues = _.cloneDeep(data);
            this.sourceCollection = data;
            this._opt.totalCount = resData.data.totalCount;

            for (var store of this._stores) {
                store.sourceCollection = [];

                if (start < data.length) {
                    store.sourceCollection = data.slice(start, end);
                    start = end;
                    end += this._opt.pageSize;
                }
            }
        } else {
            await this._vm.alert(resData.data.message);
        }
    }

    add() {
        for (var store of this._stores) {
            if (store.sourceCollection.length != store._opt.pageSize) {
                store.add();
                return;
            }
        }

        this._stores[this._stores.length - 1].add();
    }

    async del() {
        let delCount = 0,
            delList = [];

        for (var store of this._stores) {
            delCount += store._values.length;
            delList.push(store._values);
        }

        if (delCount == 0) {
            this._vm.alert('삭제할 자료를 선택하세요.');
            return;
        }

        const ok = await this._vm.confirm('선택하신 자료를 삭제하시겠습니까?');

        if (!ok) {
            return;
        }

        let errorMessage = "";
        let resData = await restApi.removeList(this._uri, delList, this._id);

        if (resData.data.code != 'OK') {
            errorMessage = resData.data.message;
        }

        if (errorMessage != "") {
            await this._vm.alert(errorMessage);
        } else {
            this.getList();
        }
    }

    async save() {
        let saveCount = 0,
            saveList = [];

        for (var store of this._stores) {
            saveCount += store.itemsAdded.length + store.itemsEdited.length;
            saveList.push(store.itemsAdded);
            saveList.push(store.itemsEdited);
        }

        if (saveCount == 0) {
            this._vm.alert('신규로 추가된 자료나 수정된 자료가 없습니다.');
            return;
        }

        const ok = await this._vm.confirm('수정 혹은 추가된 자료를 저장하시겠습니까?');

        if (!ok) {
            return;
        }

        let errorMessage = "";
        let resData = await restApi.saveList(this._uri, saveList, this._id);

        if (resData.data.code != 'OK') {
            errorMessage = resData.data.message;
        }

        if (errorMessage != "") {
            await this._vm.alert(errorMessage);
        } else {
            this.getList();
        }
    }
}