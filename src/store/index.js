import { createStore } from 'vuex'
import counter from './counter';
import axiosConfig from '@/apis/axiosConfig';

export default createStore({
  state: {
    userId: '' // mid
    , authToken: '' // authToken
  },
  getters: {
    getUserId(state, getters, rootState, rootGetters) {
      return state.userId;
    }
    , getAuthToken(state, getters, rootState, rootGetters) {
      return state.authToken;
    }
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload;
    }
    , setAuthToken(state, payload) {
      state.authToken = payload;
    }
  },
  actions: {
    // payload: {userId: "xxx", duration: 3000}
    setUserIdByAsync(context, payload) {

      console.group("Vuex Root Actions/receiveUserIdFromApi");
      console.log("context:", context);
      console.log("payload:", payload);
      console.groupEnd();

      new Promise((resolve, reject) => {
        // 시간을 요하는 작업
        setTimeout(() => {
          resolve(payload.userId)
        }
        , payload.duration);
      })
      // resolve가 되었을 경우 mutations를 이용해서 상태값 변경
      .then((data) => {
        context.commit("setUserId", data);
        console.log('userId 상태 변경 성공');
      })
      .catch((error) => {
        // 예외가 발생했거나 reject된 경우
        console.log('userId 상태 변경 실패');
      });
    }

    // 로그인이 성공했을 때 실행
    // payload: {userId: xxx, authToken: yyyy}
    , saveAuth(context, payload) {
      context.commit('setUserId', payload.userId);
      context.commit('setAuthToken', payload.authToken);
      sessionStorage.setItem('userId', payload.userId);
      sessionStorage.setItem('authToken', payload.authToken);
      axiosConfig.addAuthHeader(payload.authToken);
    }
    
    // 로그아웃할 때 실행
    , deleteAuth(context, payload) {
      context.commit('setUserId', '');
      context.commit('setAuthToken', '');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('authToken');
      axiosConfig.removeAuthHeader();
    }
    
    , loadAuth(context, payload) {
      context.commit('setUserId', sessionStorage.getItem('userId') || '');
      context.commit('setAuthToken', sessionStorage.getItem('authToken') || '');
      if(context.state.authToken !== '') {
        axiosConfig.addAuthHeader(context.state.authToken);
      }
    }
  },
  modules: {
    counter
  }
})
