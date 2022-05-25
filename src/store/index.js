import { createStore } from 'vuex'
import counter from './counter';

export default createStore({
  state: {
    userId: "summer"
  },
  getters: {
    getUserId(state, getters, rootState, rootGetters) {
      return state.userId;
    }
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload;
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
  },
  modules: {
    counter
  }
})
