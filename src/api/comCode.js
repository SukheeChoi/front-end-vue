'use strict';

import http from '@/api';

import { asCollectionView } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';

import CODE_DATA from '@/store/modules/comData';

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
    itemsSource[k] = createProxyCodeList(itemsSource[k]);
  }
  return new Proxy(itemsSource, {
    get(target, prop, receiver) {
      if (!(prop in target)) {
        const value = createProxyCodeList();
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

function load(key, value) {
  if (!key) {
    return null;
  }

  const PLAIN_KEYWORD = key.replace(/(\_\_LINK)$/, '');
  const PARAMS_CODE_LIST = key.endsWith(SUFFIX_LINK_KEYWORD) ? PREFIX_LINK_KEYWORD + PLAIN_KEYWORD : key;

  const codeList = PARAMS_CODE_LIST;
  http.get(URI + '/getList', { params: { codeList } }).then(({ data: { data: CODE_PART } }) => {
    value.push(...CODE_PART[PLAIN_KEYWORD]);
    COM_CODE[key] = value;
  });
}

const COM_CODE = createProxyCodeMap(CODE_DATA);

export { COM_CODE };
