'use strict';

const namespaced = true;

const state = () => ({ ratio: 0 });

const getters = {
  ratio(state) {
    return state.ratio;
  },
};

const mutations = {
  clear(state) {
    state.ratio = 0;
  },
  set(state, ratio) {
    state.ratio = ratio;
  },
};

const actions = {};

export default { namespaced, state, getters, mutations, actions };
