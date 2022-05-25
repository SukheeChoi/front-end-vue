export default {
  namespaced: true
  , state: {
    count: 0
  }
  , getters: {
    getCount(state, getters, rootState, rootGetters) {
      return state.count;
    }
  }
  , mutations: {
    setCount(state, payload) {
      state.count += payload;
    }
  }
  , actions: {
    // payload: {value:1, duration:3000}
    setCountByAsync(context, payload) {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(payload.value);
        }, payload.duration);
      })
      .then((data) => {
        context.commit('setCount', data);
        console.log('count 상태 변경 성공');
      })
      .catch((error) => {
        console.log('count 상태 변경 실패');
      });
    }
  }
}