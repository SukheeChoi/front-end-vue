<template>
  <ow-modal title="수신자 선택" type="XXXL" ref="modal">
    <ow-tab :items="tabs" v-model="currentTab" popup/>
    <ow-flex-wrap>
      <template v-if="currentTab === 0">
        <ow-flex-item :gap="6">
          <ow-flex-wrap col style="display: block">
            <ow-flex-item style="height:400px; width:300px;">
              <ow-org-tree-view :initialized="initialized" :item-clicked="clicked"/>
            </ow-flex-item>
          </ow-flex-wrap>
          <ow-flex-wrap col>
            <ow-flex-item>
              <!-- ow-grid로 하니까 items가 안보임! -->
              <ow-grid
                title="사용자 목록"
                ref="userGrid"
                allow-selector
                :buttons="[]"
                :footer="false"
                :initialized="orgInit"
                :items-source="userList"
                :read="getUserList"
                :query="query"
              >
                <wj-flex-grid-column header="이름" binding="userNm" width="*"/>
                <wj-flex-grid-column header="직위" binding="jpgrNm" width="*"/>
              </ow-grid>
            </ow-flex-item>
          </ow-flex-wrap>
          <ow-flex-wrap col>
            <ow-flex-item align="center" justify="center">
              <button class="ow-btn type-add">부서 추가</button>
              <button class="ow-btn type-add">사용자 추가</button>
            </ow-flex-item>
          </ow-flex-wrap>
          <ow-flex-wrap col>
            <ow-flex-item>
              <ow-grid
                title="수신자 목록"
                ref="rcvGrid"
                allow-selector
                :buttons="[]"
                :footer="false"
                :initialized="orgInit"
              >
                <wj-flex-grid-column header="이름" binding="userNm" width="*"/>
                <wj-flex-grid-column header="부서/이름" binding="orgNm" width="*"/>
                <wj-flex-grid-column header="하위부서포함" binding="jpgrNm" :width="100"/>
                <wj-flex-grid-column :width="50">
                </wj-flex-grid-column>
              </ow-grid>
            </ow-flex-item>
          </ow-flex-wrap>
        </ow-flex-item>
      </template>
      <template v-else>
        <ow-flex-item :gap="6">

        </ow-flex-item>
      </template>
    </ow-flex-wrap>
    <!-- <template #action>
      <button type="button" class="ow-btn type-base color-dark" @click="onClose()">닫기</button>
    </template> -->
  </ow-modal>
</template>

<script>
import { reactive, toRefs, watch, ref, computed } from 'vue';
import http from '@/api';

export default {
  name: 'OwOrgAddrBook',
  props: {
    items: [Object, Array],
  },
  setup(props) {
    const modal = ref(null);
    const userGrid = ref(null);

    const state = reactive({
      currentTab: 0,
      tabs : ['조직도', '그룹'],
      userList : [],
      query: {ehrOrgCd:''},
    });

    const initialized = (s) => {

    }

    const orgInit = (s) => {

    }

    const clicked = ({ selectedItem: item }) => {
      console.log('item', item);

      getUserList(item.ehrOrgCd);
    };

    const getUserList = async(ehrOrgCd)  => {
      const URI = '/com/OrgMgr/getUserList';
      const res = await http.get(URI, {
        params: {
          ehrOrgCd,
        },
      });
      state.userList = res.data.data;
      console.log('userGrid', userGrid);
      // return res.data.data;
    }

    const onClose = () => {
      modal.value.onCancel();
    };

    watch(
      () => state.userList,
      () => (console.log('state.userList', state.userList),
        userGrid.value)
    );

    return {
      modal,
      userGrid,
      ...toRefs(state),
      initialized,
      getUserList,
      orgInit,
      clicked,
      onClose,
    };
  },
};
</script>