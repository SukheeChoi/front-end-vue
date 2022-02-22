import restApi from "./restApi";
import store from "@/store";
import axios from 'axios';

class Login {
  requestLogin(url, id, pw, type) {
    const params = { loginId: id, password: pw, userType: type };
    //return restApi.approve(url, null, '', params);
    return restApi.approve(url, JSON.stringify(params), 'Login');
  }
  requestReissueToken(url, id) {
    const params = { userId: id };
    return restApi.get(url, {}, 'ReissueToken');
  }

  getUserInfo(url) {
    return restApi.get(url, {}, 'UserInfo');
  }
  getMenuList(url) {
    const params = store.getters.getUserInfo;
    //return restApi.getListPost(url, JSON.stringify(params));
    return restApi.getList(url);
  }

  getUserAuth(url) {
    return restApi.get(url);
  }

  requestModifyToken(url, id) {
    const params = { userId: id };
    return restApi.approve(url, params);
  }

  setAuth(response) {
    console.log(response);
    const jsonData = JSON.parse(response.data.data);
    const accessToken = jsonData.accessToken;
    const ttl = jsonData.ttl;

    store.commit('setToken', accessToken);
    store.commit('setTtl', ttl);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
export default new Login();