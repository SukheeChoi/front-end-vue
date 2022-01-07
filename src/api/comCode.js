import restApi from '@/api/restApi.js';
import { DataMap } from '@grapecity/wijmo.grid';
import { useStore } from 'vuex';

export class comCode {
    async getData() {
        // let resData = await restApi.getList(this._uri, Object.assign(qry, _opt), this._id);
        // return new DataMap(resData.data.data, 'value', 'name');
    }

    constructor(codeGroup, value, name) {
        const items = useStore().state.comData[codeGroup];

        if (items.length > 0) {
            return new DataMap(items, String(value), String(name));
        }
    }
}