'use strict';

import store from '@/store';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default {
  install: (app, options) => {
    const client = new Client({
      webSocketFactory: () => {
        return new SockJS('http://localhost:9000/ws');
      },
      onConnect: (frame) => {
        console.log('connect', frame);
      },
      onStompError: (frame) => {
        console.log('stomp error', frame);
      },
    });
    client.activate();
    console.log('client', client);

    // app.provide('$ws', ws);
    // ws.send(data);
  },
};
