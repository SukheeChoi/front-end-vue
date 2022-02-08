import { createStore, storeKey } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import login from './modules/login';
import menu from './modules/menu';
import notification from './modules/notification';
import loading from './modules/loading';
import comData from './modules/comData';

const resetState = () => {
  return {
    login: {
      state: {
        accessToken: '',
        userInfo: '',
        ttl: '',
      },
    },
  };
};

const plugins = [createPersistedState()];

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
  loading,
  comData,
};

function loadModules() {
  const context = require.context('@@', true, /(\/store\/)(index)\.js$/);
  for (const key of context.keys()) {
    const namespace = key.match(/[a-z]+/).at(0);
    const { default: module } = context(key);
    module.namespaced = true;
    modules[namespace] = module;
  }
}

loadModules();

export default createStore({
  plugins,
  state,
  getters,
  mutations,
  modules,
});
