import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import login from "./modules/login";

export default createStore({
    plugins: [
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
        })
    ],
    state: {},
    getters: {},
    mutations: {},
    modules: {
        login
    }
});