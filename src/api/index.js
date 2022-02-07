import axios from 'axios';
import store from '../store';
import auth from '@/store/auth';
import login from '@/api/login.js';
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
    config.headers.Authorization = `Bearer ${store.state.login.accessToken}`;

    return config;
  },
  function (error) {
    app.config.globalProperties.$dialog.alert('요청에 실패하였습니다.');
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

function handleError(responseData) {
  // 권한 오류
  if (responseData.code === '401') {
    handleAuthError(responseData);
  } else {
    //일반적인 오류
    app.config.globalProperties.$dialog.alert('응답에 실패하였습니다.');
    store.commit('setShowLoadingImage', false);
    isTokenRefreshing = false;
  }
}

async function handleAuthError(responseData) {
  if (responseData.message === 'STATUS_EXPIRED') {
    const newData = await login.requestReissueToken('/com/Auth', store.state.login.userInfo.userId);
    login.setAuth(newData);
    onTokenRefreshed(store.state.login.accessToken);
  }
  if (responseData.message === 'STATUS_MALFORMED') {
    const alert = await app.config.globalProperties.$dialog.alert(
      '사용자 정보 확인에 실패하였습니다. 다시 로그인 해주세요'
    );
    store.commit('setShowLoadingImage', false);
    router.push('/login');
  }
}
let isTokenRefreshing = false;
// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    console.log(response);
    const responseCode = response.data.code;
    const { config } = response;

    if (responseCode !== 'OK') {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        handleError(response.data);
      }
      const retryRequest = new Promise((resolve) => {
        const accessToken = store.state.login.accessToken;
        addRefreshSubscriber(() => {
          config.headers.Authorization = `Bearer ${store.state.login.accessToken}`;
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

    app.config.globalProperties.$dialog.alert('오류가 발생했습니다. 관리자에 문의해주세요');
    //const $dialog = app.inject('$dialog');
    store.commit('setShowLoadingImage', false);
    return Promise.reject(error);
  }
);

export default instance;
