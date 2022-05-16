'use strict';

import http from '@/api';

const MESSAGE_URI = '/ntf/Notification';

const GET_UNCONFIRMED_MESSAGES = '/getUnconfirmedList';
const PUT_DELETE_MESSAGE = '/deleteMessage'; //'/messages/{}/confirm';
const PUT_DELETE_ALL_MESSAGES = '/deleteAllMessages';

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
  const item = {
    recvId: message.recvId
    , ntfNo: message.ntfNo
    , recvTycd: message.recvTycd
  }
  const res = await http.put(MESSAGE_URI + PUT_DELETE_MESSAGE, [item]);
  return res.data.data;
}

export async function removeAllMessages() {
  const res = await http.put(MESSAGE_URI + PUT_DELETE_ALL_MESSAGES);
  return res.data.data;
}
