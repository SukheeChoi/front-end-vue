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
  addMessage(state, msg) {
    state.receiveList.push(msg);
  },
  removeMessage(state, msg) {
    const getIdx = (element) => element.index === msg.index,
      findIdx = state.receiveList.findIndex(getIdx);
    state.receiveList.splice(findIdx, 1);
  },
  removeAllMessage(state) {
    state.receiveList.splice(0, state.receiveList.length);
  },
};

const actions = {};

const getters = {
  getBadgeCount(state) {
    return state.receiveList.length;
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
