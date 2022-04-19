'use strict';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// PUBLISHES
function publish(client, message) {
  if (!client || !client.connected) {
    console.log('client 연결실패', client);
  }

  client.publish({
    destination: '/app/pub',
    body: JSON.stringify(message),
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
  // const index = now.getMonth() || now.getDate() || now.getHours() || now.getMinutes() || now.getMilliseconds();
  const addItem = {
    open: false,
    index: store.getters.getAlertIndex,
    dateTime,
  };
  let returnedItem = Object.assign(addItem, item);
  store.commit('receiveMessage', returnedItem);
  store.commit('setOpenAlert');
  console.log('>>>> store', store.state.notification);
}

const URL = 'http://local.osstem.com:8012/ntf';

export default {
  install: (app, options) => {
    const store = app.config.globalProperties.$store;
    const client = new Client({
      webSocketFactory: () => {
        return new SockJS(URL);
      },
      onConnect: (frame) => {
        console.log('>>>>>>>>>>>>> connect', frame);
        client.subscribe('/topic/messages', (message) => {
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
