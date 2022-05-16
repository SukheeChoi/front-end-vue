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
    console.log('publish', message);
    client.publish({
      destination: '/ntf/Colabo/publish',
      body: JSON.stringify(message),
    });
  }
  return true;
}

// SUBSCRIBES
function subscribe(store, message) {
  let item = JSON.parse(message.body);
  item = JSON.parse(item.message);

  console.log('subscribe', item);

  store.commit('message/add', item);
  store.dispatch('alert/set', item);
}

const MAPPING_PATH = '/ntf/Auth/connect';
const URL = process.env.VUE_APP_SERVER_IP + MAPPING_PATH;

export default {
  install: (app, options) => {
    const store = app.config.globalProperties.$store;
    const userInfo = store.getters.getUserInfo;
    const stompConfig = {
      reconnectDelay: 3000,
      connectionTimeout: 3000,
    };

    const client = new Client({
      webSocketFactory: () => {
        return new SockJS(URL);
      },
      beforeConnect: (frame) => {
        store.commit('socket/status', 'connecting...');
        console.log('beforeConnet', frame);
      },
      onConnect: (frame) => {
        console.log('>>>>>>>>>>>>> connect', frame);

        store.commit('socket/status', 'connect');
        store.dispatch('message/init');

        //test
        // client.subscribe('/ntf/Sub/messages', (message) => {
        //   subscribe(store, message);
        // });

        client.subscribe('/ntf/subscribe/' + userInfo.empNo, (message) => {
          subscribe(store, message);
        });

        client.subscribe('/ntf/subscribe/@' + userInfo.ehrOrgCd, (message) => {
          subscribe(store, message);
        });
      },
      onDisconnect: (frame) => {
        console.log('>>>>>>>>>>>>>> disconnect', frame);
        store.commit('socket/status', 'disconnect');
      },
      onStompError: (frame) => {
        console.log('stomp error', frame);
      },
    });

    client.configure(stompConfig);

    app.mixin({
      methods: {
        $publish: function (message) {
          publish(client, message);
          // if (publish(client, message)) {
          //   //clear message
          // }
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
