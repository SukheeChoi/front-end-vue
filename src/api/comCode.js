import _ from 'lodash';
import { OwMap } from '@/api/owMap.js';
import restApi from '@/api/restApi.js';
import CodeData from '@/store/modules/comData';

const url = '/com/Code';

export class ComCode {
  static _store = CodeData;

  static get(code, format = '{value} - {name}') {
    let itemSource = ComCode._store[code];

    if (itemSource.length > 0 && code !== 'USE_YN') {
      itemSource = ComCode.reforamt(itemSource, format);
    }

    return itemSource;
  }

  static getMap(code, filter = null, format = '{name}', value = 'value', name = 'name') {
    return new OwMap(ComCode.get(code, format), filter, value, name);
  }

  static async loadList(codeList, id = '') {
    let response = await restApi.getList(url, { codeList: codeList }, id);
    let resData = response.data.data;
    let codes = codeList.split(',');

    if (resData) {
      codes.forEach((code) => {
        var codeData = resData[code];

        if (codeData.length > 0) {
            codeData = [];
        }

        Object.assign(ComCode._store, { [code]: codeData });
      });
    } else {
      codes.forEach((code) => {
        Object.assign(ComCode._store, { [code]: [] });
      });
    }
  }

  static reformat(itemSource, displayFormat) {
    let reformatSource = _.cloneDeep(itemSource);

    for (var idx in reformatSource) {
      reformatSource[idx].name = displayFormat
        .replace('{value}', reformatSource[idx].value)
        .replace('{name}', reformatSource[idx].name);
    }

    return reformatSource;
  }
}