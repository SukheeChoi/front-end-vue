'use strict';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// PUBLISHES
function publish(client, message) {
  if (!client || !client.connected) {
    console.log('client disconnected, cant send message');
    return false;
  }

  if (message) {
    client.publish({
      destination: '/ntf/Colabo/publish',
      body: JSON.stringify(message),
    });
  }
  return true;
}

// SUBSCRIBES
function subscribe(store, message) {
  let _message = JSON.parse(message.body);

  store.dispatch('message/receive', _message);
  store.dispatch('alert/set');
}

const MAPPING_PATH = '/ntf/Auth/connect';
const URL = process.env.VUE_APP_SERVER_IP + MAPPING_PATH;

export default {
  install: (app, options) => {
    const store = app.config.globalProperties.$store;
    const stompConfig = {
      reconnectDelay: 5000,
      connectionTimeout: 5000,
      // heartbeatIncoming: 50000,
      // heartbeatOutgoing: 50000,
    };

    const client = new Client({
      webSocketFactory: () => {
        const status = store.getters['socket/status'];
        console.log('status', status);
        if (status !== 'connect') {
          return new SockJS(URL);
        }
      },
      beforeConnect: (frame) => {
        store.commit('socket/status', 'connecting...');
      },
      onConnect: (frame) => {
        console.log('>>>>>>>>>>>>> connect', frame);

        store.commit('socket/status', 'connect');
        store.dispatch('message/init');

        //test
        // client.subscribe('/ntf/Sub/messages', (message) => {
        //     subscribe(store, message);
        //   });

        const userInfo = store.getters.getUserInfo;
        const subscription = client.subscribe('/ntf/Colabo/subscribe/' + userInfo.empNo, (message) => {
          subscribe(store, message);
        });

        // client.subscribe('/ntf/subscribe/@' + userInfo.ehrOrgCd, (message) => {
        //   subscribe(store, message);
        // });
      },
      onDisconnect: (frame) => {
        console.log('>>>>>>>>>>>>>> disconnect', frame);
        store.commit('socket/status', 'disconnect');
      },
      onStompError: (frame) => {
        console.log('stomp error', frame);
      },
      onWebSocketClose: (frame) => {
        console.log('websocket close', frame);
      },
      onWebSocketError: (frame) => {
        console.log('websocket error', frame);
      },
    });

    client.configure(stompConfig);

    app.mixin({
      methods: {
        $publish: function (message) {
          publish(client, message);
        },
        $connect: function () {
          client.activate();
        },
        $disconnect: function () {
          client.deactivate();
        },
      },
    });
  },
};
