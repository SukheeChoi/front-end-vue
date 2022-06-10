<template>
  <ow-panel>
    <template #title> 표준단어 </template>
    <ow-grid :items-source="items" :header="false" :footer="false" :is-read-only="true">
      <wj-flex-grid-column header="표준단어명" binding="a" :width="100"></wj-flex-grid-column>
      <wj-flex-grid-column header="표준약어" binding="b" align="center" :width="100"></wj-flex-grid-column>
      <wj-flex-grid-column header="영문명" binding="c" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column header="표준단어유형" binding="d" align="center" :width="100"></wj-flex-grid-column>
    </ow-grid>
  </ow-panel>
</template>
<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'ThePanel2',
  components: {},
  setup() {
    const state = reactive({
      items: [
        { a: '소득발생', b: 'ICOC', c: 'Income Occurrence', d: '수식어' },
        { a: '수령인', b: 'RECV', c: 'Receiver', d: '수식어' },
        { a: '일일이체', b: 'DATF', c: 'Deaily Transfer To Account', d: '수식어' },
        { a: '가전제품', b: 'HMAP', c: 'Home Applications', d: '수식어' },
        { a: '직원', b: 'EMPL', c: 'Employee', d: '수식어' },
        { a: '명세표', b: 'DTSH', c: 'Details Sheet', d: '수식어' },
        { a: '수임', b: 'ACCP', c: 'Accept(delegation)', d: '표준어' },
        { a: '달성', b: 'ACHV', c: 'Achievement', d: '표준어' },
        { a: '초과', b: 'ABV', c: 'Above', d: '표준어' },
        { a: '접근제어', b: 'ACTL', c: 'Access control', d: '표준어' },
      ],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
