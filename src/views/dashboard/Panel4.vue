<template>
  <ow-panel>
    <template #title> Send Message </template>
    message : <ow-input v-model="message" @keyup="sendMessage"/>
  </ow-panel>
</template>
<script>
import { reactive, toRefs } from 'vue';
import store from '@/store';
import _ from 'lodash';

export default {
  name: 'ThePanel4',
  components: {},
  setup() {
    const { sidebar, alert, receiveList, badge } = store.state.notification;

    const state = reactive({
      message : '',
      sidebar,
      alert,
      badge,
      receiveList,
    });

    const sendMessage = (e) => {
      if (e.keyCode === 13) {
        const now = new Date();
        let dateTime = _.padStart(now.getMonth() + 1, 2, 0) + '-'
                     + _.padStart(now.getDate(), 2, 0) + ' '
                     + _.padStart(now.getHours(), 2, 0) + ':'
                     + _.padStart(now.getMinutes(), 2, 0),
            index = now.getMonth() 
                  || now.getDate()
                  || now.getHours()
                  || now.getMinutes()
                  || now.getMilliseconds();

        state.alert.index = index;
        state.alert.orgNm = store.getters.getUserInfo.orgNm;
        state.alert.message = state.message;
        state.alert.dateTime = dateTime;
        state.alert.userNm = store.getters.getUserInfo.userNm;
        state.receiveList.push(state.alert);
        store.commit('setOpenAlert');
        store.commit('setBadgeCount', state.receiveList.length);
        console.log('receiveList', state.receiveList);
      }
    }

    return {
      ...toRefs(state),
      sendMessage
    };
  },
};
</script>
