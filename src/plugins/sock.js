'use strict';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import store from '@/store';

// PUBLISHES
function publish(client, message) {
  if (!client || !client.connected) {
    console.log('client 연결실패', client);
  }

  client.publish({
    destination: '/ntf/Pub/Pub',
    body: JSON.stringify(message),
    // headers: { Authorization: 'Bearer ' + store.getters.getToken },
  });
}

// SUBSCRIBES
function subscribe(store, message) {
  let item = JSON.parse(message.body);
  item = JSON.parse(item.message);

  console.log('item', item);

  const now = new Date();
  const dateTime =
    _.padStart(now.getMonth() + 1, 2, 0) +
    '-' +
    _.padStart(now.getDate(), 2, 0) +
    ' ' +
    _.padStart(now.getHours(), 2, 0) +
    ':' +
    _.padStart(now.getMinutes(), 2, 0);
  const addItem = {
    dateTime,
  };
  let returnedItem = Object.assign(addItem, item);
  store.commit('message/add', returnedItem);
  store.dispatch('alert/set', returnedItem);
  console.log('>>>> store', store.state.notification);
}

const MAPPING_PATH = '/ntf/Auth/regist';
const URL = process.env.VUE_APP_SERVER_IP + MAPPING_PATH;

export default {
  install: (app, options) => {
    const store = app.config.globalProperties.$store;
    const client = new Client({
      webSocketFactory: () => {
        return new SockJS(URL, null, {
          headers: { Authorization: 'Bearer ' + store.getters.getToken },
        });
      },
      onConnect: (frame) => {
        console.log('>>>>>>>>>>>>> connect', frame);
        store.dispatch('message/init');
        client.subscribe('/Sub/' + store.state.login.userInfo.empNo, (message) => {
          subscribe(store, message);
        });
      },
      onStompError: (frame) => {
        console.log('stomp error', frame);
      },
    });
    client.activate();

    app.mixin({
      methods: {
        $publish: function (message) {
          publish(client, message);
        },
      },
    });
    console.log('client', app, client);
  },
};
