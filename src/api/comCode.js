'use strict';

import http from '@/api';

import { asCollectionView } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';

import CODE_DATA from '@/store/modules/comData';

const vue = require('vue');

const URI = '/com/Code';

const DEFAULT_SELECTED_VALUE_PATH = 'value';
const DEFAULT_DISPLAY_MEMBER_PATH = 'name';

function createProxyCodeList(
  source = [],
  selectedValuePath = DEFAULT_SELECTED_VALUE_PATH,
  displayMemberPath = DEFAULT_DISPLAY_MEMBER_PATH
) {
  return new Proxy(source, {
    get(target, prop, receiver) {
      if (prop === 'collectionView') {
        return asCollectionView(target);
      }
      if (prop === 'dataMap') {
        return new DataMap(asCollectionView(target), selectedValuePath, displayMemberPath);
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

function createProxyCodeMap(source = {}) {
  for (const k in source) {
    source[k] = vue.ref(createProxyCodeList(source[k]));
  }
  return new Proxy(source, {
    get(target, prop, receiver) {
      if (!(prop in target)) {
        const ref = vue.ref(createProxyCodeList());
        if (Reflect.set(target, prop, ref, receiver)) {
          load(prop, ref);
        }
      }
      return vue.unref(Reflect.get(target, prop, receiver));
    },
  });
}

const PREFIX_LINK_KEYWORD = 'link:';
const SUFFIX_LINK_KEYWORD = '__LINK';

async function load(keyword, proxy) {
  if (!keyword) {
    return null;
  }

  const PLAIN_KEYWORD = keyword.replace(/(\_\_LINK)$/, '');
  const PARAMS_CODE_LIST = keyword.endsWith(SUFFIX_LINK_KEYWORD) ? PREFIX_LINK_KEYWORD + PLAIN_KEYWORD : keyword;

  const {
    data: { data: CODE_PART },
  } = await http.get(URI + '/getList', { params: { codeList: PARAMS_CODE_LIST } });

  if (CODE_PART && Array.isArray(CODE_PART[PLAIN_KEYWORD])) {
    proxy.value.push(...CODE_PART[PLAIN_KEYWORD]);
  }
}

const COM_CODE = createProxyCodeMap(CODE_DATA);

export { COM_CODE };
