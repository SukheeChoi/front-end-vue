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
  itemsSource = [],
  selectedValuePath = DEFAULT_SELECTED_VALUE_PATH,
  displayMemberPath = DEFAULT_DISPLAY_MEMBER_PATH
) {
  return new Proxy(itemsSource, {
    get(target, prop, receiver) {
      if (prop === 'collectionView') {
        return asCollectionView(target);
      }
      if (prop === 'dataMap') {
        return new DataMap(asCollectionView(target), selectedValuePath, displayMemberPath);
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      return Reflect.set(target, prop, value, receiver);
    },
  });
}

function createProxyCodeMap(itemsSource = {}) {
  for (const k in itemsSource) {
    itemsSource[k] = vue.ref(createProxyCodeList(itemsSource[k]));
  }
  return new Proxy(itemsSource, {
    get(target, prop, receiver) {
      if (!(prop in target)) {
        const value = vue.ref(createProxyCodeList());
        if (Reflect.set(target, prop, value, receiver)) {
          load(prop, value);
        }
        return value;
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      return Reflect.set(target, prop, value, receiver);
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
    const ref = vue.isRef(proxy) ? proxy.value : proxy;
    ref.push(...CODE_PART[PLAIN_KEYWORD]);
  }
}

const COM_CODE = vue.reactive(createProxyCodeMap(CODE_DATA));

export { COM_CODE };
