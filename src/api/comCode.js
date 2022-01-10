import restApi from '@/api/restApi.js';
import { DataMap } from '@grapecity/wijmo.grid';
import { useStore } from 'vuex';

export class comCode {
    // _store = {};
    // const url = '/com/CommonCode';

    async populateList(codeList) {
        let reqList = [];

        for (var code of codeList) {
            if (_store[code] != null) {
                reqList.push(code);
            }
        }

        loadList(reqList);
    }

    get(code) {
        if (_store[code] == null) {
            loadList([code]);
        }

        return _store[code];
    }

    loadList(reqList) {
        if (reqList.length > 0) {
            let resData = await restApi.getList(url, reqList);

            if (resData.data.totalSize > 0) {
                for (var codeMap of resData.data.data) {
                    this._store.push(codeMap);
                }
            }
        }
    }

    // const items = useStore().state.comData[codeGroup];
    constructor(codeList, value, name) {
        _store = useStore().state.comData;
        const items = useStore().state.comData[codeList];
        // if (items.length > 0) {

        if (!value) {
            value = 'value'
        }

        if (!name) {
            name = 'name'
        }

        return new DataMap(items, String(value), String(name));
        // }
    }
}