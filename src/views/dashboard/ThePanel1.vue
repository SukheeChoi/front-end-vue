<template>
  <ow-panel>
    <template #title> 배치결과 </template>
    <ow-grid :page-no="paging.pageNo" :page-size="paging.pageSize" :total-count="paging.totalCount">
      <wj-flex-grid class="ow-grid" headersVisibility="Column" selectionMode="Row" :itemsSource="items">
        <ow-number-column header="번호" :width="50" :opt="paging"></ow-number-column>
        <wj-flex-grid-column header="배치작업명" binding="a" width="*"></wj-flex-grid-column>
        <wj-flex-grid-column header="대상시스템" binding="b" align="center" :width="100"></wj-flex-grid-column>
        <wj-flex-grid-column header="상태" binding="c" align="center" :width="50"></wj-flex-grid-column>
        <wj-flex-grid-column header="실행결과" binding="d" align="center" :width="100"></wj-flex-grid-column>
      </wj-flex-grid>
    </ow-grid>
  </ow-panel>
</template>
<script>
import OwNumberColumn from '@@/com/components/wijmo/grid/OwNumberColumn';

import { reactive, toRefs } from 'vue';

export default {
  name: 'ThePanel1',
  components: {
    OwNumberColumn,
  },
  setup() {
    const state = reactive({
      paging: {
        pageNo: 0,
        pageSize: 0,
        totalCount: 10,
      },
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
