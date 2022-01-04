import http from "./index";

const RestApi = {
  get(url, params = {}, id = '') {
    return http.get(url + '/get' + id, { params });
  },

  getList(url, params = {}, id = '') {
    return http.get(url + '/get' + id + 'List', { params });
  },

  add(url, params = {}, id = '', data = null) {
    return http.post(url + '/add' + id, data, { params });
  },

  addList(url, params = {}, id = '', data = null) {
    return http.post(url + '/add' + id + 'List', data, { params });
  },

  modify(url, params = {}, id = '', data = null) {
    return http.post(url + '/modify' + id, data, { params });
  },

  modifyList(url, params = {}, id = '', data = null) {
    return http.post(url + '/modify' + id + 'List', data, { params });
  },

  remove(url, params = {}, id = '', data = null) {
    return http.post(url + '/remove' + id, data, { params });
  },

  removeList(url, params = {}, id = '', data = null) {
    return http.post(url + '/remove' + id + 'List', data, { params });
  },

  save(url, params = {}, id = '', data = null) {
    return http.post(url + '/save' + id, data, { params });
  },

  approve(url, params = {}, id = '', data = null) {
    return http.post(url + '/approve' + id, data, { params });
  },

  cancel(url, params = {}, id = '', data = null) {
    return http.post(url + '/cancel' + id, data, { params });
  },

  execute(url, params = {}, id = '', data = null) {
    return http.post(url + '/execute' + id, data, { params });
  },
};

export default RestApi