const namespace = true;

const state = () => ({
  menuList: [],
  myMenuList: [],
});

const mutations = {
  setMyMenuList(state, myMenuList = []) {
    state.myMenuList.splice(0);
    state.myMenuList.push(...myMenuList);
  },
};

const actions = {};

const getters = {
  getMyMenuList(state) {
    return state.myMenuList || [];
  },
};

export default {
  namespace,
  state,
  mutations,
  actions,
  getters,
};
