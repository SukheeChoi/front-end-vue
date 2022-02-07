<template>
  <ow-panel>
    <template #title> 공통코드 </template>
    <ow-grid :page-no="paging.pageNo" :page-size="paging.pageSize" :total-count="paging.totalCount">
      <wj-flex-grid
        class="ow-grid"
        headersVisibility="Column"
        selectionMode="Row"
        :is-read-only="true"
        :itemsSource="items"
      >
        <wj-flex-grid-column header="코드그룹" binding="a" :width="80"></wj-flex-grid-column>
        <wj-flex-grid-column header="코드그룹명" binding="b" width="*"></wj-flex-grid-column>
        <wj-flex-grid-column header="사용여부" binding="d" align="center" :width="80"></wj-flex-grid-column>
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
        totalCount: 2,
      },
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
