const namespace = true;

const state = () => ({
  savedId: '',
  checked: false,
});

const mutations = {
  setSavedId(state, payload) {
    state.savedId = payload;
  },
  setChecked(state, payload) {
    state.checked = payload;
  },
};

const getters = {
  getSavedId(state) {
    return state.savedId;
  },
  getChecked(state) {
    return state.checked;
  },
};

export default {
  namespace,
  state,
  mutations,
  getters,
};
