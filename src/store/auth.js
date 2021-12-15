import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { ACCESS_TOKEN } from "../utils/constants.js"

Vue.use(Vuex)

export default new Vuerx.Store({
    state: {
        userInfo: null,
        accessToken: '',
        loginTime: new Date(),

        isLogin: false,
        isLoginError: true
    },
    mutations: {
        loginSuccess(state, payload) {
            state.isLogin = true
            state.isLoginError = false
            state.userInfo = payload
        },
        loginError(state) {
            state.isLogin = false
            state.isLoginError = true
        },
        clearUserInfo(state) {
            state.userInfo = null;
            state.accessToken = null;
            state.loginTime = null;
            localStorage.removeItem(ACCESS_TOKEN);
        }
    },
    actions: {
        login({ dispatch }, loginInfo) {
            axios
                .post("/com/login", loginInfo)
                .then(response => {
                    let token = response.data.token
                    localStorage.setItem(ACCESS_TOKEN, token)
                    dispatch("getUserInfo")
                })
                .catch(() => {
                    alert("사용자 ID와 비밀번호를 확인하세요.")
                })
        },
        logout({ commit }) {
            commit('clearUserInfo');
            router.push({ name: "/" })
        },
        getUserInfo({ commit }) {
            let token = localStorage.getItem(ACCESS_TOTKEN)
            let config = {
                headers: {
                    ACCESS_TOKEN: token
                }
            }
            axios
                .get("", config)
                .then(response => {
                    commit("loginSuccess", response.data.data)
                    router.push({ name: "MyPage" })
                })
                .catch(() => {
                    alert("사용자 ID와 비밀번호를 확인하세요.")
                })
        }
    }
})