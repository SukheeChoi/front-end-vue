export default {
    namespace: true,
    state: () => ({
        showLoadingImage: false,
    }),
    mutations: {
        setShowLoadingImage(state, payload) {
            state.showLoadingImage = payload;
        },
    },
    getters: {
        getShowLoadingImage(state) {
            return state.showLoadingImage;
        },
    },
};