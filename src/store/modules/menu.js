const namespace = true;

const state = () => ({
  menuList: [],
});

const mutations = {
  addMenuList(state, payload) {
    const at = state.menuList.findIndex((menu) => menu.name === payload.name);
    state.menuList.splice(at, 1, payload);
  },
};

const actions = {};

const getters = {
  getMenuList(state) {
    return state.menuList;
  },
};

export default {
  namespace,
  state,
  mutations,
  actions,
  getters,
};
