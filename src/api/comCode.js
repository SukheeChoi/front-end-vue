import _ from 'lodash';
import { OwMap } from '@/api/owMap.js';
import restApi from '@/api/restApi.js';
import CodeData from '@/store/modules/comData';
import { CollectionView } from '@grapecity/wijmo';

const url = '/com/Code';

export class ComCode {
  static _store = CodeData;

  static get(code, format = '{value} - {name}') {
    code = code.replace('link:', '').trim();
    let itemSource = ComCode._store[code];
    let newSource = [];

    if (itemSource && itemSource.length > 0) {
      newSource = _.cloneDeep(itemSource);
    }

    if (newSource.length > 0 && code !== 'USE_YN') {
      newSource = ComCode.reformat(newSource, format);
    }

    return new CollectionView(newSource);
  }

  static getMap(code, filter = null, format = '{name}', selectedValuePath = 'value', displayMemberPath = 'name') {
    let itemSource = ComCode._store[code];

    if (itemSource.length > 0 && code !== 'USE_YN') {
      itemSource = ComCode.reformat(itemSource, format);
    }

    return new OwMap(itemSource, filter, selectedValuePath, displayMemberPath);
  }

  static async loadList(codeList, id = '') {
    let response = await restApi.getList(url, { codeList: codeList }, id);
    let resData = response.data.data;
    let codes = codeList.replace('link:', '').split(',');

    if (resData) {
      codes.forEach((code) => {
        code = code.trim();
        var codeData = resData[code.trim()];

        if (codeData.length == 0) {
          codeData = [];
        }

        Object.assign(ComCode._store, { [code]: codeData });
      });
    } else {
      codes.forEach((code) => {
        code = code.trim();
        Object.assign(ComCode._store, { [code]: [] });
      });
    }
  }

  static reformat(reformatSource, displayFormat) {
    for (var idx in reformatSource) {
      reformatSource[idx].name = displayFormat
        .replace('{value}', reformatSource[idx].value)
        .replace('{name}', reformatSource[idx].name);
    }

    return reformatSource;
  }
}