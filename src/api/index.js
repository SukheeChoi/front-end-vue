import axios from 'axios';
import store from '../store';
import auth from '@/store/auth';
//import login from '@/api/login.js';
import { requestReissueToken } from '@/api/login.js';
import router from '@/routes';
import { app } from '@/main';

const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_IP,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();
    for (const name in params) {
      searchParams.append(name, params[name]);
    }
    return searchParams.toString();
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  function (config) {
    console.log(config);
    // Loading Image
    store.commit('setShowLoadingImage', true);
    config.headers.Authorization = `Bearer ${store.getters.getToken}`;

    return config;
  },
  function (error) {
    app.config.globalProperties.$dialog.alert('요청에 실패하였습니다. \n' + error.message);
    store.commit('setShowLoadingImage', false);

    return Promise.reject(error);
  }
);

let refreshSubscribers = [];
const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
  refreshSubscribers = [];
};
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

async function handleError(responseData) {
  // 권한 오류
  if (responseData.code === '401' || responseData.code === '599') {
    handleAuthError(responseData);
  } else {
    //일반적인 오류
    app.config.globalProperties.$dialog.alert('응답에 실패하였습니다. \n' + responseData.message);
    store.commit('setShowLoadingImage', false);
    isTokenRefreshing = false;
  }
}

async function handleAuthError(responseData) {
  if (responseData.message === 'auth.expired') {
    //const newData = await login.requestReissueToken('/com/Auth');
    const newData = await requestReissueToken('/com/Auth');
    //login.setAuth(newData);
    store.commit('setAuth', newData.data.data);
    onTokenRefreshed(store.getters.getToken);
  }
  if (responseData.message === 'auth.session.expried') {
    store.commit('reset');
    router.push('/login');
  }
  if (responseData.message === 'STATUS_MALFORMED') {
    const alert = await app.config.globalProperties.$dialog.alert(
      '사용자 정보 확인에 실패하였습니다. 다시 로그인 해주세요'
    );
    store.commit('setShowLoadingImage', false);
    store.commit('reset');
    router.push('/login');
  }
}
let isTokenRefreshing = false;
// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    console.log(response);
    const data = response.data;
    if (data instanceof Blob) {
      store.commit('setShowLoadingImage', false);
      return data;
    }
    const responseCode = data.code;
    const { config } = response;

    if (responseCode !== 'OK') {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        handleError(data);
      }
      const retryRequest = new Promise((resolve) => {
        const accessToken = store.getters.getToken;
        addRefreshSubscriber(() => {
          config.headers.Authorization = `Bearer ${store.getters.getToken}`;
          resolve(axios(config));
        });
      });
      isTokenRefreshing = false;
      store.commit('setShowLoadingImage', false);
      return retryRequest;
    }

    store.commit('setShowLoadingImage', false);
    return response;
  },
  async (error) => {
    console.log(error);
    const { config } = error;

    app.config.globalProperties.$dialog.alert('오류가 발생했습니다. 관리자에 문의해주세요. \n' + error.message);
    //const $dialog = app.inject('$dialog');
    store.commit('setShowLoadingImage', false);
    return Promise.reject(error);
  }
);

export default instance;
