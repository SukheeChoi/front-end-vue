<template>
  <ow-panel>
    <template #title> 언어코드 </template>
    <ow-grid :page-no="paging.pageNo" :page-size="paging.pageSize" :total-count="paging.totalCount">
      <wj-flex-grid class="ow-grid" headersVisibility="Column" selectionMode="Row" :itemsSource="items">
        <ow-number-column header="번호" :width="50" :opt="paging"></ow-number-column>
        <wj-flex-grid-column header="언어코드" binding="a" align="center" :width="80"></wj-flex-grid-column>
        <wj-flex-grid-column header="언어명" binding="b" width="*"></wj-flex-grid-column>
        <wj-flex-grid-column header="사용여부" binding="c" align="center" :width="80"></wj-flex-grid-column>
      </wj-flex-grid>
    </ow-grid>
  </ow-panel>
</template>
<script>
import OwNumberColumn from '@@/com/components/wijmo/grid/OwNumberColumn';

import { reactive, toRefs } from 'vue';

export default {
  name: 'ThePanel3',
  components: {
    OwNumberColumn,
  },
  setup() {
    const state = reactive({
      paging: {
        pageNo: 0,
        pageSize: 0,
        totalCount: 5,
      },
      items: [
        { a: 'ko', b: 'korean', c: 'Y' },
        { a: 'en', b: 'english', c: 'Y' },
        { a: 'ch', b: 'china', c: 'Y' },
        { a: 'jp', b: 'japan', c: 'Y' },
        { a: 'sp', b: 'spanish', c: 'Y' },
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
