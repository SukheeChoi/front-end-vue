<template>
  <ow-panel>
    <template #title> Send Message </template>
    <ow-flex-wrap class="size-full">
      <ow-flex-item :gap="6">
        <ow-flex-wrap col style="display: block">
          <ow-flex-item style="height:380px;">
            <ow-org-tree-view :with-users="withUsers" :show-checkboxes="true"  :initialized="initialized"/>
          </ow-flex-item>
        </ow-flex-wrap>
        <ow-flex-wrap col>
          <ow-flex-item>
            <button v-if="connect === 'connect'" @click="disconnectSocket" type="button" class="ow-btn type-base color-dark">disconnect</button>
            <button v-else-if="connect === 'disconnect'" @click="connectSocket" type="button" class="ow-btn type-base color-dark">connect</button>
            <button v-else type="button" class="ow-btn type-base color-dark" disabled>connecting...</button>
          </ow-flex-item>
          <h1>대상자</h1>
          <ow-flex-item>
            <label>{{ checkedEmpNo }}</label>
            <!-- <template v-for="({userNm, empNo}) in checkedUsers" :key="empNo">
              <label>{{ empNo }}, </label>
            </template> -->
          </ow-flex-item>
          <h1>대상부서</h1>
          <ow-flex-item>
            <label>{{ checkedEhrOrgCd }}</label>
            <!-- <template v-for="({orgNm, ehrOrgCd}) in checkedOrgs" :key="ehrOrgCd">
              <label>{{ ehrOrgCd }}, </label>
            </template> -->
          </ow-flex-item>
          <h1>선택그룹</h1>
          <ow-flex-item>
            <!-- <template v-for="({orgNm, empNo}) in checkedOrgs" :key="empNo">
              <label>{{ orgNm }}, </label>
            </template> -->
          </ow-flex-item>
          <h1>message</h1>
          <ow-flex-item>
            <textarea v-model="sendList.msg" @keyup="sendMessage"/>
          </ow-flex-item>
        </ow-flex-wrap>
      </ow-flex-item>
    </ow-flex-wrap>
  </ow-panel>
</template>
<script>
import { computed, reactive, toRefs } from 'vue';
import store from '@/store';
import _ from 'lodash';
import { instance } from '@/main';

export default {
  name: 'ThePanel4',
  components: {},
  setup() {

    const state = reactive({
      withUsers: true,
      checkedUsers : [],
      checkedOrgs : [],
      checkedEmpNo : computed(
        () => {
          let items = [];
          for (let i = 0; i < state.checkedUsers.length; i++) {
            items.push(state.checkedUsers[i].empNo);
          }
          return _.uniq(items);
        }),
      checkedEhrOrgCd : computed(
        () => {
          let items = [];
          for (let i = 0; i < state.checkedOrgs.length; i++) {
            items.push(state.checkedOrgs[i].ehrOrgCd);
          }
          return _.uniq(items);
        }),
      checkedGrps : [],
      connect : computed(() => store.getters["socket/status"]),
      sendList : computed(() => {
        let list = {
          cmpnCd : '',  // 보내는사람,,? 받는사람 회사,,?
          bizCd : '',
          topic : '',
          title : '',
          msg : '',
          rcvIds : state.checkedEmpNo,
          rcvOrgs : state.checkedEhrOrgCd,
          rcvGrpIds : state.checkedGrps,
        }
        return list;
      })
    });

    const initialized = (s) => {
      s.checkedItemsChanged.addHandler(() => {
        if (s.checkedAllItems.length > 0) {
          state.checkedOrgs = _.xor(state.checkedUsers, s.checkedAllItems);
        } else {
          state.checkedOrgs = [];
        }
        state.checkedUsers = s.checkedItems;
      });
    }

    const connectSocket = (e) => {
      store.dispatch('socket/connect');
    }

    const disconnectSocket = () => {
      store.dispatch('socket/disconnect');
    }

    const sendMessage = (e) => {
      if (e.keyCode === 13) {
        store.dispatch('message/send', state.sendList);
      }
    }

    return {
      ...toRefs(state),
      initialized,
      connectSocket,
      disconnectSocket,
      sendMessage
    };
  },
};
</script>
<style scoped>
.ow-node-tree-body {
  height: 200px;
}

</style>
