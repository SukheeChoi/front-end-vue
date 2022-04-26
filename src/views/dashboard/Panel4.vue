<template>
  <ow-panel>
    <template #title> Send Message </template>
    <ow-flex-wrap class="size-full">
      <ow-flex-item :gap="6">
        <ow-flex-wrap col style="display: block">
          <ow-flex-item style="height:380px;">
            <ow-org-tree-view :with-users="withUsers" :show-checkboxes="true" :checkedItemsChanged="checkedItemsChanged"/>
          </ow-flex-item>
        </ow-flex-wrap>
        <ow-flex-wrap col>
          <ow-flex-item>
            <button v-if="connect" @click="disconnectSocket" type="button" class="ow-btn type-base color-dark">disconnect</button>
            <button v-else @click="connectSocket" type="button" class="ow-btn type-base color-dark">connect</button>
          </ow-flex-item>
          <h1>대상자</h1>
          <ow-flex-item>
            <template v-for="({userNm, empNo}) in checkedUsers" :key="empNo">
              <label>{{ userNm }}, </label>
            </template>
          </ow-flex-item>
          <h1>대상부서</h1>
          <ow-flex-item>
            <template v-for="({orgNm, empNo}) in checkedOrgs" :key="empNo">
              <label>{{ orgNm }}, </label>
            </template>
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
    const { orgNm, userNm } = store.state.login.userInfo;

    const state = reactive({
      withUsers: true,
      checkedUsers : [],
      checkedOrgs : [],
      connect : computed(() => store.getters["socket/connect"]),
      sendList : {
        msg : '',
        userNm,
        orgNm,
      },
    });

    // const initialized = (s) => {
    //   s.checkedItemsChanged.addHandler(() => {
    //     for (const currentDataItem of s.checkedItems) {
    //       const currentNode = s.getNode(currentDataItem);
    //       const parentNode = currentNode.parentNode;
    //       const parentDataItem = parentNode.dataItem;

    //       // 부모, 자식 데이터 mix
    //       state.checkedOrgs = _.xor(state.checkedUsers, s.checkedAllItems);
    //       const currentDataItemWithParentPart = {
    //         orgNm: parentDataItem.orgNm,
    //         ...currentDataItem,
    //       };
    //     }
    //   });
    // }

    const connectSocket = (e) => {
      store.dispatch('socket/connect');
    }

    const disconnectSocket = () => {
      store.dispatch('socket/disconnect');
    }

    const checkedItemsChanged = (e) => {
      state.checkedUsers = e.checkedItems;
    }

    const sendMessage = (e) => {
      if (e.keyCode === 13) {
        instance.$publish(state.sendList);
      }
    }

    return {
      ...toRefs(state),
      // initialized,
      connectSocket,
      disconnectSocket,
      checkedItemsChanged,
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
