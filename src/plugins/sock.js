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
  console.log('message', store, message);
  // store.receiveList.push();
  const item = JSON.parse(message.body);

  const now = new Date();
  const dateTime =
      _.padStart(now.getMonth() + 1, 2, 0) +
      '-' +
      _.padStart(now.getDate(), 2, 0) +
      ' ' +
      _.padStart(now.getHours(), 2, 0) +
      ':' +
      _.padStart(now.getMinutes(), 2, 0),
    index = now.getMonth() || now.getDate() || now.getHours() || now.getMinutes() || now.getMilliseconds();

  store.commit('addMessage', {
    open: true,
    index,
    userNm: '홍길동',
    orgNm: 'OW공통개발팀',
    dateTime,
    message: item.message,
  });
  store.commit('setOpenAlert');
}

// const URL = 'http://local.osstem.com:9000/ws';
const URL = 'http://local.osstem.com:8160/ws';

export default {
  install: (app, options) => {
    const store = app.config.globalProperties.$store;
    const client = new Client({
      webSocketFactory: () => {
        // return new SockJS('http://local.osstem.com:8160/ws');
        return new SockJS(URL);
      },
      onConnect: (frame) => {
        console.log('>>>>>>>>>>>>> connect', frame);
        client.subscribe('/topic/messages', (message) => {
          subscribe('subscribe', store, message);
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
          publish('publish', client, message);
        },
      },
    });
    console.log('client', app, client);
  },
};
