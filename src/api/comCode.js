'use strict';

import http from '@/api';

import { asCollectionView } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';

import CODE_DATA from '@/store/modules/comData';

import { reactive, readonly, ref, unref } from 'vue';

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
  COMMON_CODE[cmmGrpCd] = newCommonCodeList;
  loadCodeList(cmmGrpCd, newCommonCodeList);
  return readonly(unref(newCommonCodeList));
}

function getCode(cmmGrpCd, cmmCd) {
  const commonCodeList = getCodeList(cmmGrpCd);
  for (const commonCode of commonCodeList) {
    if (commonCode.value === cmmCd) {
      return readonly(commonCode);
    }
  }
  return null;
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
  return new DataMap(asCollectionView(arr), displayMemberPath, selectedValuePath);
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

export { getCodeList, getCode, asCollectionView, asDataMap, prepend, append, combine };
