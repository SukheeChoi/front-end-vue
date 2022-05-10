export default {
  namespace: true,
  state: {
    dsbdMpngScrnList: [],
  },
  getters: {
    init(state) {
      state.dsbdMpngScrnList = [];
    },
    getDsbdMpngScrnList(state) {
      return state.dsbdMpngScrnList || [];
    },
  },
  mutations: {
    setDashboard(state, payload) {
      state.dsbdMpngScrnList = payload;
    },
  },
};
