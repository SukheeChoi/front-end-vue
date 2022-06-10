'use strict';

import { createStore } from 'vuex';
import persistedstate from 'vuex-persistedstate';

import login from '@/store/modules/login';
import menu from '@/store/modules/menu';
import notification from '@/store/modules/notification';
import dashboard from '@/store/modules/dashboard';
import loading from '@/store/modules/loading';
import comData from '@/store/modules/comData';
import savedInfo from '@/store/modules/savedInfo';
import progress from '@/store/modules/progress';

function getNamespace(key) {
  const namespace = key.replace(/^(\.\/app\/|\.\/)/, '');
  if (namespace.startsWith('store')) {
    return '';
  }
  const at = namespace.indexOf('/');
  return namespace.substring(0, at);
}

function asModule(module, defaultModule = {}) {
  return module.default || module || defaultModule;
}

const resetState = () => {
  return {
    login: {
      accessToken: '',
      userInfo: '',
      ttl: '',
      isLogin: false,
    },
    dashboard: {
      dsbdMpngScrnList: [],
    },
    menu: {
      screenList: [],
      routeRootList: [],
      routeChildList: [],
      routeList: [],
      myMenuList: [],
    },
  };
};

const plugins = [
  persistedstate({
    key: process.env.VUE_APP_STORE_PERSISTED_STATE_KEY,
    paths: (process.env.VUE_APP_STORE_PERSISTED_STATE_PATHS || '').split(','),
  }),
];

const state = () => ({});

const mutations = {
  reset(state) {
    Object.assign(state, resetState());
  },
};

const getters = {};

const modules = {
  login,
  menu,
  notification,
  dashboard,
  loading,
  comData,
  savedInfo,
  progress,
};

const context = require.context('@@', true, /\/store\/index\.(js)$/);
const keys = context.keys();
for (const key of keys) {
  const module = asModule(context(key));
  if (module) {
    module.namespaced = true;
    const namespace = getNamespace(key);
    if (namespace) {
      modules[namespace] = module;
    }
  }
}

export default createStore({
  plugins,
  state,
  getters,
  mutations,
  modules,
});
