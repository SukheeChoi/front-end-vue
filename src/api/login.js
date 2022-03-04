import restApi from './restApi';
import store from '@/store';
import axios from 'axios';

export function requestLogin(url, id, pw, type) {
  const params = { loginId: id, password: pw, userType: type };
  return restApi.approve(url, JSON.stringify(params), 'Login');
}

export function getUserInfo(url) {
  return restApi.get(url, {}, 'UserInfo');
}

export function getMenuList(url) {
  const params = store.getters.getUserInfo;
  return restApi.getList(url);
}

export function requestReissueToken(url) {
  return restApi.get(url, {}, 'ReissueToken');
}
