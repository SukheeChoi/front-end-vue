import http from "./index";

const RestApi = {
    get(url, params = {}, id = "") {
        return http.get(url + "/get" + id, { params });
    },

    getList(url, params = {}, id = "") {
        return http.get(url + "/get" + id + "List", { params });
    },

    add(url, params = {}, id = "") {
        return http.post(url + "/add" + id, { params });
    },

    addList(url, params = {}, id = "") {
        return http.post(url + "/add" + id + "List", { params });
    },

    modify(url, params = {}, id = "") {
        return http.post(url + "/modify" + id, { params });
    },

    modifyList(url, params = {}, id = "") {
        return http.post(url + "/modify" + id + "List", { params });
    },

    remove(url, params = {}, id = "") {
        return http.post(url + "/remove" + id, { params });
    },

    removeList(url, params = {}, id = "") {
        return http.post(url + "/remove" + id + "List", { params });
    },

    save(url, params = {}, id = "") {
        return http.post(url + "/save" + id, { params });
    },

    approve(url, params = {}, id = "") {
        return http.post(url + "/approve" + id, { params });
    },

    cancel(url, params = {}, id = "") {
        return http.post(url + "/cancel" + id, { params });
    },

    execute(url, params = {}, id = "") {
        return http.post(url + "/execute" + id, { params });
    }
}

export default RestApi