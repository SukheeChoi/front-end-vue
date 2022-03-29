import _ from 'lodash';
import { OwMap } from '@/api/owMap.js';
import restApi from '@/api/restApi.js';
import CodeData from '@/store/modules/comData';

const url = '/com/Code';

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

  static get(code, displayFormat = '{value} - {name}') {
    if (code == 'USE_YN') {
      displayFormat = null;
    }

    let itemSource = ComCode._store[code];

    return itemSource;
  }

  static getMap(
    code,
    filterKey = null,
    displayFormat = '{name}',
    selectedValuePath = 'value',
    displayMemberPath = 'name'
  ) {
    return new OwMap(ComCode.getValue(code, displayFormat), filterKey, selectedValuePath, displayMemberPath);
  }

  static getValue(code, displayFormat = null) {
    let itemSource = ComCode._store[code];

    if (itemSource == null) {
      itemSource = [];
    }

    return itemSource;
  }

  static async loadList(reqList, id = '') {
    let resData = await restApi.getList(url, { codeList: reqList }, id);

    if (resData.data.data) {
      let codes = reqList.split(',');
      codes.forEach((code) => {
        if (resData.data.data[code].length > 0) {
          Object.assign(ComCode._store, { [code]: resData.data.data[code] });
        }
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