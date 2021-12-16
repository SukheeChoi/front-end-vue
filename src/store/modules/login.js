export default {
    namespace: true,
    state: {
        accessToken: '',
        userInfo: '',
    },
    getters: {

    },
    mutations: {
        setToken(state, payload) {
            state.accessToken = payload
        },
        setUserInfo(state, payload) {
            state.userInfo = payload
        }
    },

}