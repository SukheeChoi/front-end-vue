<template>
  <ow-panel>
    <template #title> 공통코드 </template>
    <ow-grid :items-source="items" :header="false" :footer="false" :is-read-only="true">
      <wj-flex-grid-column header="코드그룹" binding="a" :width="80"></wj-flex-grid-column>
      <wj-flex-grid-column header="코드그룹명" binding="b" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column header="사용여부" binding="d" align="center" :width="80"></wj-flex-grid-column>
    </ow-grid>
  </ow-panel>
</template>
<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'ThePanel3',
  components: {},
  setup() {
    const state = reactive({
      items: [
        { a: 'USE_YN', b: '사용여부', d: 'Y' },
        { a: 'CRUD_TP', b: 'CRUD 유형', d: 'Y' },
      ],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
