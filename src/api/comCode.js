'use strict';

import http from '@/api';

import { reactive, readonly, ref, unref } from 'vue';

import { asCollectionView } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';

import CODE_DATA from '@/store/modules/comData';

const URI = '/com/Code';

const DEFAULT_SELECTED_VALUE_PATH = 'value';
const DEFAULT_DISPLAY_MEMBER_PATH = 'name';

const PREFIX_LINK_KEYWORD = 'link:';
const SUFFIX_LINK_KEYWORD = '__LINK';

const COMMON_CODE = reactive({
  ...CODE_DATA,
});

function getCodeList(cmmGrpCd) {
  const commonCodeList = COMMON_CODE[cmmGrpCd];
  if (commonCodeList) {
    return readonly(unref(commonCodeList));
  }
  const newCommonCodeList = ref([]);
  loadCodeList(cmmGrpCd, (COMMON_CODE[cmmGrpCd] = newCommonCodeList));
  return readonly(unref(newCommonCodeList));
}

function getCode(cmmGrpCd, cmmCd) {
  const commonCodeList = getCodeList(cmmGrpCd);
  for (const commonCode of commonCodeList) {
    if (commonCode.value === cmmCd) {
      return readonly(commonCode);
    }
  }
  return {};
}

async function loadCodeList(cmmGrpCd, newCommonCodeList) {
  if (!cmmGrpCd) {
    return newCommonCodeList;
  }

  const PLAIN_KEYWORD = cmmGrpCd.replace(/(\_\_LINK)$/, '');
  const PARAMS_CODE_LIST = cmmGrpCd.endsWith(SUFFIX_LINK_KEYWORD) ? PREFIX_LINK_KEYWORD + PLAIN_KEYWORD : cmmGrpCd;

  const {
    data: { data: CODE_PART },
  } = await http.get(URI + '/getList', { params: { codeList: PARAMS_CODE_LIST } });

  if (CODE_PART && Array.isArray(CODE_PART[PLAIN_KEYWORD])) {
    newCommonCodeList.value.push(...CODE_PART[PLAIN_KEYWORD]);
  }
}

function asDataMap(
  arr,
  displayMemberPath = DEFAULT_DISPLAY_MEMBER_PATH,
  selectedValuePath = DEFAULT_SELECTED_VALUE_PATH
) {
  return new DataMap(asCollectionView(arr), selectedValuePath, displayMemberPath);
}

function asFilteredDataMap(
  arr,
  binding,
  displayMemberPath = DEFAULT_DISPLAY_MEMBER_PATH,
  selectedValuePath = DEFAULT_SELECTED_VALUE_PATH
) {
  const dataMap = asDataMap(arr, displayMemberPath, selectedValuePath);
  dataMap.getDisplayValues = function (dataItem) {
    if (!(this._cv && this._displayPath)) {
      return [];
    }
    const items = binding ? this._cv.items.filter((item) => dataItem[binding] === item.link) : this._cv.items;
    return items.map((item) => item[this._displayPath]);
  };
  return dataMap;
}

function prepend(arr = [], args = []) {
  return readonly([...args, ...unref(arr)]);
}

function append(arr = [], args = []) {
  return readonly([...unref(arr), ...args]);
}

function combine(arr = [], ...args) {
  const prepend = args.at(0) ?? [];
  const append = args.at(1) ?? [];
  return readonly([...prepend, ...unref(arr), ...append]);
}

export { getCodeList, getCode, asCollectionView, asDataMap, asFilteredDataMap, prepend, append, combine };
