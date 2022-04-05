'use strict';

import http from '@/api';

import { asCollectionView } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';

import CODE_DATA from '@/store/modules/comData';

const vue = require('vue');

const URI = '/com/Code';

const DEFAULT_SELECTED_VALUE_PATH = 'value';
const DEFAULT_DISPLAY_MEMBER_PATH = 'name';

const COM_CODE = createProxyCodeMap(CODE_DATA);

function getName(cmmGrpCd, cmmCd) {
  if (!cmmCd) {
    return '';
  }
  const GROUP = COM_CODE[cmmGrpCd];
  if (GROUP && Array.isArray(GROUP)) {
    const PART = GROUP.find((g) => g.value === cmmCd);
    if (PART) {
      return PART.name;
    }
  }
  return '';
}

function createProxyCodeList(source = []) {
  return new Proxy(source, {
    get(target, prop, receiver) {
      if (prop === 'getName') {
        return new Proxy(() => {}, {
          apply(fn, that, args) {
            for (const KEY in COM_CODE) {
              if (COM_CODE[KEY] === receiver) {
                return getName(KEY, args.at(0));
              }
            }
            return '';
          },
        });
      }
      if (prop === 'collectionView') {
        return new Proxy(() => {}, {
          apply() {
            return asCollectionView(receiver);
          },
        });
      }
      if (prop === 'dataMap') {
        return new Proxy(() => {}, {
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
    source[k] = vue.ref(createProxyCodeList(source[k]));
  }
  return new Proxy(source, {
    get(target, prop, receiver) {
      if (prop === 'getName') {
        return new Proxy(() => {}, {
          apply(fn, that, args) {
            return getName(...args);
          },
        });
      }
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

export { COM_CODE };
