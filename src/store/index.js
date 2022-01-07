import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import login from './modules/login';
import menu from './modules/menu';
import notification from './modules/notification';
import loading from './modules/loading';
import comData from './modules/comData';

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
        menu,
        notification,
        loading,
        comData,
    },
});