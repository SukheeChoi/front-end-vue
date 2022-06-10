export default {
  namespace: true,
  state: {
    dsbdMpngScrnList: [],
  },
  getters: {
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
