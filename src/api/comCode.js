'use strict';

import http from '@/api';

import { computed, reactive, readonly, toRef, unref, watch } from 'vue';

import { asCollectionView as _asCollectionView } from '@grapecity/wijmo';
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

const COLLECTION_VIEW_MAP = new Map();

export function getCodeList(cmmGrpCd) {
  const commonCodeList = COMMON_CODE[cmmGrpCd];
  if (commonCodeList) {
    return readonly(unref(commonCodeList));
  }
  const newCommonCodeList = toRef(COMMON_CODE, cmmGrpCd);
  loadCodeList(cmmGrpCd, newCommonCodeList);
  return readonly(unref(newCommonCodeList));
}

export function getCode(cmmGrpCd, cmmCd) {
  const commonCodeList = getCodeList(cmmGrpCd);
  for (const commonCode of commonCodeList) {
    if (commonCode.value === cmmCd) {
      return readonly(commonCode);
    }
  }
  return {};
}

function trigger() {
  for (const [key, collectionView] of COLLECTION_VIEW_MAP) {
    if (COLLECTION_VIEW_MAP.delete(key)) {
      collectionView.onCollectionChanged();
    }
  }
}

export function asCollectionView(arr) {
  if (COLLECTION_VIEW_MAP.has(arr)) {
    return COLLECTION_VIEW_MAP.get(arr);
  }
  const collectionView = _asCollectionView(arr);
  COLLECTION_VIEW_MAP.set(arr, collectionView);
  return collectionView;
}

export function asDataMap(
  arr,
  displayMemberPath = DEFAULT_DISPLAY_MEMBER_PATH,
  selectedValuePath = DEFAULT_SELECTED_VALUE_PATH
) {
  return new DataMap(asCollectionView(arr), selectedValuePath, displayMemberPath);
}

export function asFilteredLink(arr, link) {
  return unref(computed(() => arr.filter((item) => item.link === link)));
}

export function asFilteredDataMap(arr, binding, displayMemberPath, selectedValuePath) {
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

export function prepend(arr = [], args = []) {
  return readonly([...args, ...unref(arr)]);
}

export function append(arr = [], args = []) {
  return readonly([...unref(arr), ...args]);
}

export function combine(arr = [], ...args) {
  const prepend = args.at(0) ?? [];
  const append = args.at(1) ?? [];
  return readonly([...prepend, ...unref(arr), ...append]);
}

async function loadCodeList(cmmGrpCd, newCommonCodeList) {
  newCommonCodeList.value = [];
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
    trigger();
  }
}
