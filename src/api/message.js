'use strict';

import http from '@/api';
import store from '@/store';

const MESSAGE_URI = '/ntf/Notification';

const GET_UNCONFIRMED_MESSAGES = '/getUnconfirmedList';
const REMOVE_MESSAGE = '/removeMessage';
const REMOVE_ALL_MESSAGES = '/removeAllMessages';

function format(str, ...args) {
  let i = 0;
  return str.replace(/{}/g, () => {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
}

export async function getAllUnconfirmedMessages(empNo) {
  const res = await http.get(MESSAGE_URI + GET_UNCONFIRMED_MESSAGES, {
    params: {
      empNo 
    }
  });
  return res.data.data;
}

export async function removeMessage(message) {
  const res = await http.put(MESSAGE_URI + REMOVE_MESSAGE, message);
  return res.data.data;
}

export async function removeAllMessages() {
  const empNo = store.getters.getUserInfo.empNo;
  const res = await http.put(MESSAGE_URI + REMOVE_ALL_MESSAGES, { 
    recvId : empNo 
  });
  return res.data.data;
}
