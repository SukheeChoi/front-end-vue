<template>
  <ow-panel>
    <template #title> 통화코드 </template>
    <ow-grid :page-no="paging.pageNo" :page-size="paging.pageSize" :total-count="paging.totalCount">
      <wj-flex-grid
        class="ow-grid"
        headersVisibility="Column"
        selectionMode="Row"
        :is-read-only="true"
        :itemsSource="items"
      >
        <wj-flex-grid-column header="통화코드" binding="a" :width="80"></wj-flex-grid-column>
        <wj-flex-grid-column header="통화기호" binding="b" width="*"></wj-flex-grid-column>
        <wj-flex-grid-column header="통화명" binding="c" align="center" :width="80"></wj-flex-grid-column>
        <wj-flex-grid-column header="환율관리여부" binding="d" align="center" :width="80"></wj-flex-grid-column>
      </wj-flex-grid>
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
      paging: {
        pageNo: 0,
        pageSize: 0,
        totalCount: 5,
      },
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
<style lang="scss" scoped>
:deep(.ow-flex-wrap) {
  .item {
    &:first-child,
    &:last-child {
      display: none;
    }
  }
}
</style>
