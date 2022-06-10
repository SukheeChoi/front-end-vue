'use strict';

import { getAllUnconfirmedMessages, confirmMessage, allConfirmMessages } from '@/api/message';

// 보여줄 최대 메시지 개수
const NUMBER_OF_MESSAGES_TO_DISPLAY = process.env.VUE_APP_NUMBER_OF_MESSAGES_TO_DISPLAY ?? 20;

const sidebar = {
  namespaced: true,
  state: () => ({
    open: false,
  }),
  mutations: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
  },
  actions: {},
  getters: {
    open(state) {
      return state.open;
    },
  },
};

const alert = {
  namespaced: true,
  state: () => ({
    open: false,
    index: 0,
    dateTime: '',
    userNm: '',
    orgNm: '',
    message: '',
  }),
  mutations: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
  },
  actions: {
    open(state) {
      state.open = true;
      return setTimeout(() => {
        state.open = false;
      }, 3000);
    },
    setData(state, item) {
      state.index = item.index;
      state.dateTime = item.dateTime;
      state.userNm = item.userNm;
      state.orgNm = item.orgNm;
      state.message = item.message;

      open(state);
    },
  },
  getters: {
    userName(state) {
      return state.userNm;
    },
    orgName(state) {
      return state.orgNm;
    },
    dateTime(state) {
      return state.dateTime;
    },
    message(state) {
      return state.message;
    },
    index(state) {
      return state.index++;
    },
    open(state) {
      return state.open;
    },
  },
};

const message = {
  namespaced: true,
  state: () => ({
    open: false,
    messages: [],
  }),
  mutations: {
    set(state, messages) {
      if (state.messages.length > 0) {
        console.warn('메시지가 안비어있음');
        return;
      }
      state.messages = messages;
    },
    add(state, message) {
      state.messages.push(message);
    },
    remove(state, message) {
      const at = state.messages.indexOf(message);
      if (at > -1) {
        state.messages.splice(at, 1);
      }
    },
    clear(state) {
      state.messages = [];
    },
  },
  actions: {
    // 메시지 초기화
    async init({ commit }) {
      // 서버로 확인하지 않은 메시지 목록을 받아서 설정
      commit('set', await getAllUnconfirmedMessages()); // 두 번째 인자는 await 서버 다녀오기
    },
    // 메시지 확인(지우기)
    async confirm({ commit }, message) {
      // 서버로 메시지 확인에 대한 처리 이후에 메시지 지우기
      if (await confirmMessage(message.id)) {
        commit('remove', message);
      }
    },
    // 모든 메시지 확인(지우기)
    async allConfirm({ commit }) {
      // 서버로 메시지 확인에 대한 처리 이후에 메시지 초기화
      if (await allConfirmMessages()) {
        commit('clear');
      }
    },
  },
  getters: {
    count(state) {
      return state.messages.length;
    },
    // 최근 메시지
    latestMessage(state) {
      return state.messages.at(-1);
    },
    // 최근 메시지 목록
    latestMessages(state) {
      return state.messages.slice(-1 * NUMBER_OF_MESSAGES_TO_DISPLAY).reverse();
    },
    messages(state) {
      return state.messages;
    },
  },
};

export default {
  modules: { alert, message, sidebar },
};
