const namespace = true;

const state = () => ({
  menuList: [],
});

const mutations = {
  addMenuList(state, payload) {
    state.menuList.splice(0);
    state.menuList.push(...payload);
  },
};

const actions = {};

const getters = {
  getMenuList(state) {
    return state.menuList || [];
  },
};

export default {
  namespace,
  state,
  mutations,
  actions,
  getters,
};
