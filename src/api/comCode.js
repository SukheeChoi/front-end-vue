import _ from 'lodash';
import { OwMap } from '@/api/owMap.js';
import restApi from '@/api/restApi.js';
import CodeData from '@/store/modules/comData';
import { CollectionView } from '@grapecity/wijmo';

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

    static get(code, displayFormat = "{value} - {name}") {
        return new CollectionView(ComCode.getValue(code, displayFormat));
    }

    static getMap(code, filterKey = null, displayFormat = "{value} - {name}", selectedValuePath = "value", displayMemberPath = "name") {
        return new OwMap(ComCode.getValue(code, displayFormat), filterKey, selectedValuePath, displayMemberPath);
    }

    static getValue(code, displayFormat = null) {
        let itemSource = ComCode._store[code];

        if (itemSource == null) {
            loadList([code]);
            itemSource = ComCode._store[code];
        }

        if (code == "USE_YN") {
            displayFormat = null;
        }

        if (displayFormat) {
            itemSource = ComCode.reformat(itemSource, displayFormat);
        }

        return itemSource;
    }

    static async loadList(reqList) {
        if (reqList.length == 0) {
            return;
        }

        let resData = await restApi.getList(url, reqList);

        if (resData.data.totalSize > 0) {
            for (var codeMap of resData.data.data) {
                ComCode._store.push(codeMap);
            }
        }
    }

    static reformat(itemSource, displayFormat) {
        let reformatSource = _.cloneDeep(itemSource);

        for (var idx in reformatSource) {
            reformatSource[idx].name = displayFormat
                .replace("{value}", reformatSource[idx].value)
                .replace("{name}", reformatSource[idx].name);
        }

        return reformatSource;
    }
}