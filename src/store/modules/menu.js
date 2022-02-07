import { Menu } from '@/model';
const namespace = true;

const state = () => ({
  screenList: [],
  myMenuList: [],
});

const mutations = {
  setScreenList(state, payload) {
    state.screenList = payload;
  },
  setMyMenuList(state, myMenuList = []) {
    state.myMenuList.splice(0);
    state.myMenuList.push(...myMenuList);
  },
};

const actions = {};

const getters = {
  getScreenList(state) {
    if (typeof state.screenList === 'undefined') {
      return [];
    }

    return state.screenList.map(({ title, name, children }) => Menu.create(title, name, children));
  },
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
