import restApi from './restApi';
import store from '@/store';

export function requestLogin(url, cmpnCd, id, pw, userType) {
  const params = { cmpnCd: cmpnCd, loginId: id, password: pw, userType: userType };
  return restApi.approve(url, params, 'Login');
}

export function getUserInfo(url) {
  return restApi.get(url, {}, 'UserInfo');
}

export function getMenuList(url) {
  const params = store.getters.getUserInfo;
  return restApi.getList(url);
}

export function requestReissueToken(url) {
  return restApi.reissue(url, {}, 'Token');
}
