import http from './index';

const RestApi = {
  get(url, params = {}, id = '') {
    return http.get(url + '/get' + id, { params });
  },

  getList(url, params = {}, id = '') {
    return http.get(url + '/get' + id + 'List', { params });
  },
  getListPost(url, data, id = '', params = {}) {
    return http.post(url + '/get' + id + 'List', data, { params });
  },
  getListFile(url, data, id = '') {
    return http.post(url + '/get' + id + 'List', data);
  },
  add(url, data, id = '', params = {}) {
    return http.post(url + '/add' + id, data, { params });
  },

  addList(url, data, id = '', params = {}) {
    return http.post(url + '/add' + id + 'List', data, { params });
  },

  modify(url, data, id = '', params = {}) {
    return http.post(url + '/modify' + id, data, { params });
  },

  modifyList(url, data, id = '', params = {}) {
    return http.post(url + '/modify' + id + 'List', data, { params });
  },

  remove(url, data, id = '', params = {}) {
    return http.post(url + '/remove' + id, data, { params });
  },

  removeList(url, data, id = '', params = {}) {
    return http.post(url + '/remove' + id + 'List', data, { params });
  },

  save(url, data, id = '', params = {}) {
    return http.post(url + '/save' + id, data, { params });
  },

  approve(url, data, id = '', params = {}) {
    return http.post(url + '/approve' + id, data, { params });
  },

  cancel(url, data, id = '', params = {}) {
    return http.post(url + '/cancel' + id, data, { params });
  },

  execute(url, data, id = '', params = {}) {
    return http.post(url + '/execute' + id, data, { params });
  },
};

export default RestApi;
