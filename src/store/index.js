import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import login from './modules/login';
import notification from '@/store/modules/notification';

export default createStore({
  plugins: [
    /*
        createPersistedState({
            key: "user",
            paths: ["login"],
            filter: mutation => {
                if (mutation.type === "login/setUserInfo") {
                    return true;
                }
                return false;
            },
            storage: window.sessionStorage
        })*/
    createPersistedState(),
  ],
  state: {},
  getters: {},
  mutations: {},
  modules: {
    login,
    notification,
  },
});
