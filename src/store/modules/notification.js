const state = () => ({
  // AppHeader
  badge: {
    count: 5,
  },
  // AppAside
  sidebar: {
    open: false,
  },
  alert: {
    open: false,
    user_name: '홍길동',
    dept_name: '물류본부',
    time: new Date(),
    message: 'AA 제품 피킹 완료 - 주문서 내역을 확인후 빠른 처리가 요구됩니다.',
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
  setOpenAlert(state) {
    state.alert.open = true;
  },
  setCloseAlert(state) {
    state.alert.open = false;
  },
};

const actions = {};

const getters = {
  getBadgeCount(state) {
    return state.badge.count;
  },
  getAlertUserName(state) {
    return state.alert.user_name;
  },
  getAlertDeptName(state) {
    return state.alert.dept_name;
  },
  getAlertTime(state) {
    return state.alert.time;
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
