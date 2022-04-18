<template>
  <ow-panel>
    <template #title> 조직도 </template>
    <ow-org-tree-view :with-users="withUsers" :item-clicked="clicked"></ow-org-tree-view>
  </ow-panel>
</template>
<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'ThePanel6',
  components: {},
  setup() {
    const state = reactive({
      withUsers: true,
    });

    // https://demo.grapecity.co.kr/wijmo/api/classes/wijmo_nav.treeview.html#itemclicked
    const clicked = ({ selectedItem: item }) => {
      console.log('item', item);
    };

    return {
      ...toRefs(state),
      clicked,
    };
  },
};
</script>
