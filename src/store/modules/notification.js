'use strict';

import { getAllUnconfirmedMessages, removeMessage, allConfirmMessages, removeAllMessages } from '@/api/message';
import { instance } from '@/main';
import store from '@/store';
import template from '@/model/notification';

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
    open({ commit }) {
      commit('open');
      return setTimeout(() => {
        commit('close');
      }, 5000);
    },
    async set({ dispatch }) {
      await dispatch('open');
    },
  },
  getters: {
    open(state) {
      return state.open;
    },
  },
};

const socket = {
  namespaced: true,
  state: () => ({
    connect: false,
    status: 'disconnect',
    websocket: 'close',
  }),
  mutations: {
    connect(state) {
      state.connect = true;
    },
    disconnect(state) {
      state.connect = false;
    },
    status(state, value) {
      state.status = value;
    },
  },
  actions: {
    async connect({ commit }) {
      await instance.$connect();
      commit('connect');
    },
    async disconnect({ commit }) {
      await instance.$disconnect();
      commit('disconnect');
    },
  },
  getters: {
    connect(state) {
      return state.connect;
    },
    status(state) {
      return state.status;
    },
  },
};

const message = {
  namespaced: true,
  state: () => ({
    open: false,
    messages: [],
    message: [],
  }),
  mutations: {
    set(state, messages) {
      state.messages = [];
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
    payload(state, message) {
      state.message = template;
      if (state.message) {
        const userInfo = store.getters.getUserInfo;

        state.message.rowStatus = 'C';
        state.message.ntfNo = Date.now().toString();
        state.message.refNtfNo = Date.now().toString();
        state.message.cmpnCd = userInfo.cmpnCd;
        state.message.bizCd = message.bizCd;
        state.message.topic = message.topic;
        state.message.title = message.title;
        state.message.msg = message.msg;
        state.message.sndId = userInfo.empNo;
        state.message.sndDtm = '';
        state.message.recvIds = message.recvIds;
        state.message.recvOrgs = message.recvOrgs;
        state.message.recvGrpIds = message.recvGrpIds;
        //
        state.message.sndNm = userInfo.userNm;
        state.message.orgNm = userInfo.orgNm;
      }
    },
  },
  actions: {
    // 메시지 초기화
    async init({ commit }) {
      // 서버로 확인하지 않은 메시지 목록을 받아서 설정
      const userInfo = store.getters.getUserInfo;
      // 개발서버 테이블 미반영으로 주석처리
      commit('set', await getAllUnconfirmedMessages(userInfo.empNo)); // 두 번째 인자는 await 서버 다녀오기
    },
    // 메시지 확인(지우기)
    async remove({ commit }, message) {
      // 서버로 메시지 확인에 대한 처리 이후에 메시지 지우기
      await removeMessage(message);
      const userInfo = store.getters.getUserInfo;
      commit('set', await getAllUnconfirmedMessages(userInfo.empNo));
    },
    // 모든 메시지 확인(지우기)
    async removeAll({ commit }) {
      // 서버로 메시지 확인에 대한 처리 이후에 메시지 초기화
      if (await removeAllMessages()) {
        // 개발서버 테이블 미반영으로 주석처리
        const userInfo = store.getters.getUserInfo;
        commit('set', await getAllUnconfirmedMessages(userInfo.empNo));
      }
    },
    async send({ commit, state }, message) {
      await commit('payload', message);
      await instance.$publish(state.message);
    },
    async receive({ commit, dispatch }, message) {
      const userInfo = store.getters.getUserInfo;

      commit('add', message); // 임시 추가

      // 개발서버 테이블 미반영으로 주석처리
      // commit('set', await getAllUnconfirmedMessages(userInfo.empNo));
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
    message(state) {
      return state.message;
    },
  },
};

export default {
  modules: { alert, message, sidebar, socket },
};
