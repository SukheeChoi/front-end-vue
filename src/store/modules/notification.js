'use strict';

import { getAllUnconfirmedMessages, confirmMessage, allConfirmMessages } from '@/api/message';

// 보여줄 최대 메시지 개수
const NUMBER_OF_MESSAGES_TO_DISPLAY = process.env.VUE_APP_NUMBER_OF_MESSAGES_TO_DISPLAY ?? 20;

const state = () => ({
  messages: [],
});

const mutations = {
  // 메시지 초기화
  setMessages(state, messages) {
    if (state.messages.length > 0) {
      console.warn('메시지가 안비어있음');
      return;
    }
    state.messages = messages;
  },
  // 메시지 추가
  addMessage(state, message) {
    state.messages.push(message);
  },
  // 메시지 지우기
  removeMessage(state, message) {
    const at = state.messages.indexOf(message);
    if (at > -1) {
      state.messages.splice(at, 1);
    }
  },
  // 메시지 비우기
  clearMessages(state) {
    state.messages = [];
  },
};

const actions = {
  // 메시지 초기화
  async initMessages({ commit }) {
    // 서버로 확인하지 않은 메시지 목록을 받아서 설정
    commit('setMessages', await getAllUnconfirmedMessages()); // 두 번째 인자는 await 서버 다녀오기
  },
  // 메시지 확인(지우기)
  async confirmMessage({ commit }, message) {
    // 서버로 메시지 확인에 대한 처리 이후에 메시지 지우기
    if (await confirmMessage(message.id)) {
      commit('removeMessage', message);
    }
  },
  // 모든 메시지 확인(지우기)
  async allConfirmMessages({ commit }) {
    // 서버로 메시지 확인에 대한 처리 이후에 메시지 초기화
    if (await allConfirmMessages()) {
      commit('clearMessages');
    }
  },
};

const getters = {
  // 알림 개수
  badgeCount(state) {
    return state.messages.length;
  },
  // 최근 메시지
  latestMessage(state) {
    return state.messages.at(-1);
  },
  // 최근 메시지 목록
  latestMessages(state) {
    return state.messages.slice(-1 * NUMBER_OF_MESSAGES_TO_DISPLAY);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
