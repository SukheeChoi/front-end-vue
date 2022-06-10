<template>
  <ow-panel>
    <template #title> 배치결과 </template>
    <ow-grid :items-source="items" :header="false" :footer="false" :is-read-only="true">
      <wj-flex-grid-column header="배치작업명" binding="a" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column header="대상시스템" binding="b" align="center" :width="100"></wj-flex-grid-column>
      <wj-flex-grid-column header="상태" binding="c" align="center" :width="50"></wj-flex-grid-column>
      <wj-flex-grid-column header="실행결과" binding="d" align="center" :width="100"></wj-flex-grid-column>
    </ow-grid>
  </ow-panel>
</template>
<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'ThePanel1',
  components: {},
  setup() {
    const state = reactive({
      items: [
        { a: 'SAP ITEM MASTER 수집', b: 'SAP', c: '정상', d: '성공' },
        { a: 'SAP ITEM MASTER 수집', b: 'SAP', c: '정상', d: '성공' },
        { a: 'SAP ITEM MASTER 수집', b: 'SAP', c: '정상', d: '성공' },
        { a: 'SAP ITEM MASTER 수집', b: 'SAP', c: '정상', d: '성공' },
        { a: 'SAP ITEM MASTER 수집', b: 'SAP', c: '정상', d: '성공' },
        { a: 'SAP ITEM MASTER 수집', b: 'SAP', c: '정상', d: '성공' },
        { a: 'SAP ITEM MASTER 수집', b: 'SAP', c: '정상', d: '성공' },
        { a: 'SAP ITEM MASTER 수집', b: 'SAP', c: '정상', d: '성공' },
        { a: 'SAP ITEM MASTER 수집', b: 'SAP', c: '정상', d: '성공' },
        { a: 'SAP ITEM MASTER 수집', b: 'SAP', c: '정상', d: '성공' },
      ],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
