const state = () => ({
  // AppHeader
  badge: {
    count: 0,
  },
  // AppAside
  sidebar: {
    open: false,
  },
  alert: {
    open: true,
    index: 0,
    userNm: '',
    orgNm: '',
    dateTime: '',
    message: '',
  },
  receiveList: [],
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
  setOpenAlert(state) {
    state.alert.open = true;
  },
  setCloseAlert(state) {
    state.alert.open = false;
  },
  removeMessage(state, msg) {
    const getIdx = (element) => element.index === msg.index;
    const findIdx = state.receiveList.findIndex(getIdx);
    state.receiveList.splice(findIdx, 1);
    state.badge.count = state.receiveList.length;
  },
  removeAllMessage(state) {
    state.receiveList.splice(0, state.receiveList.length);
    state.badge.count = 0;
  },
};

const actions = {};

const getters = {
  getBadgeCount(state) {
    return state.badge.count;
  },
  getAlertUserName(state) {
    return state.alert.userNm;
  },
  getAlertOrgName(state) {
    return state.alert.orgNm;
  },
  getAlertDateTime(state) {
    return state.alert.dateTime;
  },
  getAlertMessage(state) {
    return state.alert.message;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
