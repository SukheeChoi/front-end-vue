import http from "./index";

const RestApi = {
    get(url, params) {
        return http.get(url, { params: params });
    },

    getList(url, params) {
        return http.get(url, params);
    },

    add(url, params) {
        return http.post(url, params);
    },

    addList(url, params) {
        return http.post(url, params);
    },

    modify(url, params) {
        return http.post(url, params);
    },

    modifyList(url, params) {
        return http.post(url, params);
    },

    remove(url, params) {
        return http.post(url, params);
    },

    removeList(url, params) {
        return http.post(url, params);
    },

    save(url, params) {
        return http.post(url, params);
    },

    approve(url, params) {
        //return http.post(url, params);
        return http.post(url, null, {
            params: params
        })
    },

    cancel(url, params) {
        return http.post(url, params);
    },

    execute(url, params) {
        return http.post(url, null, {
            params: params
        })
    }
}

export default RestApi