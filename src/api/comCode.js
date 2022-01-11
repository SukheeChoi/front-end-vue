import restApi from '@/api/restApi.js';
import { DataMap } from '@grapecity/wijmo.grid';
import { useStore } from 'vuex';

let _store = {};
// const _store = useStore().state.comData;
const url = '/com/CommonCode';

export class comCode {

    async populateList(codeList) {
        let reqList = [];

        for (var code of codeList) {
            if (_store[code] != null) {
                reqList.push(code);
            }
        }

        this.loadList(reqList);
    }

    get(code, displayFormat = null, selectedValuePath = 'value', displayMemberPath = 'name') {
        if (_store[code] == null) {
            // loadList([code]);
        }

        return new DataMap(_store[code], selectedValuePath, displayMemberPath);
    }

    loadList(reqList) {
        if (reqList.length > 0) {
            // let resData = await restApi.getList(url, reqList);
            let resData = null;

            if (resData.data.totalSize > 0) {
                for (var codeMap of resData.data.data) {
                    this._store.push(codeMap);
                }
            }
        }
    }

    constructor(codeList, value, name) {
        _store = useStore().state.comData;
        const items = _store[codeList];

        if (!value) {
            value = 'value'
        }

        if (!name) {
            name = 'name'
        }

        // return new DataMap(items, String(value), String(name));
    }
}