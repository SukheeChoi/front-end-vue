const state = () => ({
  // AppHeader
  badge: {
    count: 5,
  },
  // AppAside
  sidebar: {
    open: false,
  },
  push: {
    open: false,
  },
});

const mutations = {
  setBadgeCount(state, value) {
    state.badge.count = value;
  },
  setOpenSidebar(state) {
    state.sidebar.open = true;
  },
  setCloseSidebar(state) {
    state.sidebar.open = false;
  },
  setOpenPush(state) {
    state.push.open = true;
  },
  setClosePush(state) {
    state.push.open = false;
  },
};

const actions = {};

const getters = {
  getBadgeCount(state) {
    return state.badge.count;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
