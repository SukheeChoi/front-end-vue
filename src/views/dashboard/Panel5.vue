<template>
  <ow-panel>
    <template #title> 통화코드 </template>
    <ow-grid :items-source="items" :header="false" :footer="false" :is-read-only="true">
      <wj-flex-grid-column header="통화코드" binding="a" :width="80"></wj-flex-grid-column>
      <wj-flex-grid-column header="통화기호" binding="b" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column header="통화명" binding="c" align="center" :width="80"></wj-flex-grid-column>
      <wj-flex-grid-column header="환율관리여부" binding="d" align="center" :width="80"></wj-flex-grid-column>
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
        { a: 'KRW', b: '₩', c: '원', d: 'Y' },
        { a: 'USD', b: '$', c: 'US달러', d: 'Y' },
        { a: 'EUR', b: '€', c: '유로', d: 'Y' },
        { a: 'JPY', b: '¥', c: '엔', d: 'Y' },
        { a: 'CNY', b: '¥', c: '위안', d: 'Y' },
      ],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
