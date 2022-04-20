'use strict';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// PUBLISHES
function publish(client, message) {
  if (!client || !client.connected) {
    console.log('client 연결실패', client);
  }

  client.publish({
    // destination: '/Pub',
    destination: '/ntf/Pub/Pub',
    body: JSON.stringify(message),
  });
  console.log('message', message);
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
    open: false,
    dateTime,
  };
  let returnedItem = Object.assign(addItem, item);
  store.commit('message/add', returnedItem);
  store.commit('alert/open');
  console.log('>>>> store', store.state.notification);
}

const URL = 'http://local.osstem.com/ntf/Auth/regist';
// const URL = process.env.VUE_APP_SERVER_IP;

export default {
  install: (app, options) => {
    const store = app.config.globalProperties.$store;
    const client = new Client({
      webSocketFactory: () => {
        return new SockJS(URL);
      },
      onConnect: (frame) => {
        console.log('>>>>>>>>>>>>> connect', frame);
        store.dispatch('message/init');
        client.subscribe('/ntf/Sub', (message) => {
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
