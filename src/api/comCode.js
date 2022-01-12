import restApi from '@/api/restApi.js';
import { DataMap } from '@grapecity/wijmo.grid';
import CodeData from '@/store/modules/comData';

const url = '/com/CommonCode';

export class ComCode {
    static _store = CodeData;

    static async populateList(codeList) {
        let reqList = [];

        for (var code of codeList) {
            if (ComCode._store[code] != null) {
                reqList.push(code);
            }
        }

        ComCode.loadList(reqList);
    }

    static get(code, displayFormat = null, selectedValuePath = 'value', displayMemberPath = 'name') {
        if (ComCode._store[code] == null) {
            // loadList([code]);
        }

        return new DataMap(ComCode._store[code], selectedValuePath, displayMemberPath);
    }

    static getValue(code, displayFormat = null, selectedValuePath = 'value', displayMemberPath = 'name') {
        if (ComCode._store[code] == null) {
            // loadList([code]);
        }

        return ComCode._store[code];
    }

    static loadList(reqList) {
        if (reqList.length > 0) {
            // let resData = await restApi.getList(url, reqList);
            let resData = null;

            if (resData.data.totalSize > 0) {
                for (var codeMap of resData.data.data) {
                    ComCode._store.push(codeMap);
                }
            }
        }
    }
}