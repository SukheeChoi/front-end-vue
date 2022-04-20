<template>
  <ow-panel>
    <template #title> Send Message </template>
    message : <ow-input v-model="sendList.message" @keyup="sendMessage"/>
  </ow-panel>
</template>
<script>
import { reactive, toRefs } from 'vue';
import store from '@/store';
import _ from 'lodash';
import { instance } from '@/main';

export default {
  name: 'ThePanel4',
  components: {},
  setup() {
    const { orgNm, userNm } = store.state.login.userInfo;

    const state = reactive({
      sendList : {
        message : '',
        userNm,
        orgNm,
      },
    });

    const sendMessage = (e) => {
      if (e.keyCode === 13) {
        instance.$publish(state.sendList);
      }
    }

    return {
      ...toRefs(state),
      sendMessage
    };
  },
};
</script>
