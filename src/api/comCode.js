import _ from 'lodash';
import { OwMap } from '@/api/owMap.js';
import restApi from '@/api/restApi.js';
import CodeData from '@/store/modules/comData';
import { CollectionView } from '@grapecity/wijmo';

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

  static async get(code, displayFormat = '{name}') {
    let itemSource = await ComCode.getValue(code, displayFormat);
    console.log('1', code, itemSource);

    if (itemSource.length <= 0) {
      await ComCode.loadList(code);
    }
    console.log('2', code, ComCode._store[code]);

    if (displayFormat) {
      await ComCode.reformat(ComCode._store[code], displayFormat);
    }
    console.log('3', code, ComCode._store[code]);

    return new CollectionView(ComCode._store[code]);
  }

  static getMap(
    code,
    filterKey = null,
    displayFormat = '{name}',
    selectedValuePath = 'value',
    displayMemberPath = 'name'
  ) {
    // let itemSource = ComCode.getValue(code, displayFormat);
    // console.log('1', code, itemSource);

    // if (itemSource.length <= 0) {
    //   ComCode.loadList(code);
    // }
    // console.log('2', code, ComCode._store[code]);

    // if (displayFormat) {
    //   ComCode.reformat(ComCode._store[code], displayFormat);
    // }
    // console.log('3', code, ComCode._store[code]);

    // return ComCode._store[code];

    return new OwMap(ComCode.getValue(code, displayFormat), filterKey, selectedValuePath, displayMemberPath);
  }

  static getValue(code, displayFormat = null) {
    let itemSource = ComCode._store[code];

    // if (itemSource == null) {
    //   ComCode.loadList(code);
    //   itemSource = ComCode._store[code];
    // }

    if (itemSource == null) {
      itemSource = [];
    }
    // else {
    //   if (displayFormat) {
    //     itemSource = ComCode.reformat(itemSource, displayFormat);
    //   }
    // }

    return itemSource;
  }

  //ComCode.loadList('OWTASK_CD,USER_STATCD');
  static async loadList(reqList, id = '') {
    console.log('reqList', reqList);
    // if (reqList.length == 0) {
    //   return;
    // }

    let resData = await restApi.getList(url, { codeList: reqList }, id);
    console.log('resData', resData);

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