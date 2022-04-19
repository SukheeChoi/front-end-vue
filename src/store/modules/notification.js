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
    dateTime: '',
    userNm: '',
    orgNm: '',
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
  receiveMessage(state, msg) {
    state.alert = msg;
    state.receiveList.push(msg);
  },
  removeMessage(state, msg) {
    const getIdx = (element) => element.index === msg.index;
    state.receiveList.splice(state.receiveList.findIndex(getIdx), 1);
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
  getAlertIndex(state) {
    return state.alert.index++;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
