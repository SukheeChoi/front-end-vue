<template>
  <ow-panel>
    <template #title> 조직도 </template>
    <ow-org-tree-view :with-users="withUsers" :item-clicked="clicked"></ow-org-tree-view>
  </ow-panel>
</template>
<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'ThePanel3',
  components: {},
  setup() {
    const state = reactive({
      withUsers: true,
    });

    const clicked = (item) => {
      console.log('item', item);
    };

    return {
      ...toRefs(state),
      clicked,
    };
  },
};
</script>
