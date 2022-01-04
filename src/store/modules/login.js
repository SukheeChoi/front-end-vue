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
        setTtl(state, payload) {
            state.ttl = payload
        },
        setUserInfo(state, payload) {
            state.userInfo = payload
        }
    },

}