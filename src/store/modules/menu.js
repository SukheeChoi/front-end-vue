export default {
    namespace: true,
    state: {
        menus: ''
    },
    mutations: {
        setMenus(state, payload) {
            state.menus = payload
        }
    }

}