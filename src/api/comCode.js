'use strict';

import http from '@/api';

import { asCollectionView } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';

import CODE_DATA from '@/store/modules/comData';

const vue = require('vue');

const URI = '/com/Code';

const DEFAULT_SELECTED_VALUE_PATH = 'value';
const DEFAULT_DISPLAY_MEMBER_PATH = 'name';

const NOOP = () => {};

const READ_ONLY_COM_CODE = vue.readonly(createProxyCodeMap(CODE_DATA));

function getName(cmmGrpCd, cmmCd) {
  const GROUP_CODE = READ_ONLY_COM_CODE[cmmGrpCd];
  if (GROUP_CODE) {
    for (const PART_CODE of GROUP_CODE) {
      if (PART_CODE.value === cmmCd) {
        return PART_CODE.name;
      }
    }
  }
  return '';
}

function createProxyCodeList(source = []) {
  return new Proxy(source, {
    get(target, prop, receiver) {
      if (prop === 'getName') {
        return new Proxy(NOOP, {
          apply(fn, that, args) {
            let cmmGrpCd = '';
            const cmmCd = args.at(0);
            for (const KEY in READ_ONLY_COM_CODE) {
              if (READ_ONLY_COM_CODE[KEY] === that) {
                cmmGrpCd = KEY;
                break;
              }
            }
            return getName(cmmGrpCd, cmmCd);
          },
        });
      }
      if (prop === 'collectionView') {
        return new Proxy(NOOP, {
          apply() {
            return asCollectionView(receiver);
          },
        });
      }
      if (prop === 'dataMap') {
        return new Proxy(NOOP, {
          apply(fn, that, args) {
            const displayMemberPath = args.at(0) ?? DEFAULT_DISPLAY_MEMBER_PATH;
            const selectedValuePath = args.at(1) ?? DEFAULT_SELECTED_VALUE_PATH;
            return new DataMap(asCollectionView(receiver), selectedValuePath, displayMemberPath);
          },
        });
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

function createProxyCodeMap(source = {}) {
  for (const k in source) {
    const ref = vue.ref(createProxyCodeList(source[k]));
    source[k] = vue.unref(ref);
  }
  return new Proxy(source, {
    get(target, prop, receiver) {
      if (typeof prop === 'symbol' || prop.startsWith('__v')) {
        return Reflect.get(target, prop, receiver);
      }
      if (prop === 'getName') {
        return new Proxy(NOOP, {
          apply(fn, that, args) {
            const cmmGrpCd = args.at(0);
            const cmmCd = args.at(1);
            return getName(cmmGrpCd, cmmCd);
          },
        });
      }
      if (!(prop in target)) {
        const ref = vue.ref(createProxyCodeList());
        if (Reflect.set(target, prop, vue.unref(ref), receiver)) {
          load(prop, ref);
        }
      }
      return Reflect.get(target, prop, receiver);
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

export { READ_ONLY_COM_CODE as COM_CODE };
