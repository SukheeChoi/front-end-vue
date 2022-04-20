'use strict';

import http from '@/api';

const MESSAGE_URI = '/ws';

const GET_UNCONFIRMED_MESSAGES = '/messages/unconfirmed';
const PUT_CONFIRM_MESSAGE = '/messages/{}/confirm';
const PUT_ALL_CONFIRM_MESSAGES = '/messages/all-confirm';

function format(str, ...args) {
  let i = 0;
  return str.replace(/{}/g, () => {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
}

export async function getAllUnconfirmedMessages() {
  const res = await http.get(MESSAGE_URI + GET_UNCONFIRMED_MESSAGES);
  return res.data.data;
}

export async function confirmMessage(id) {
  const res = await http.put(format(MESSAGE_URI + PUT_CONFIRM_MESSAGE, id));
  return res.data.data;
}

export async function allConfirmMessages() {
  const res = await http.put(MESSAGE_URI + PUT_ALL_CONFIRM_MESSAGES);
  return res.data.data;
}
