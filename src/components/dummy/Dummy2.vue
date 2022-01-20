<template>
  <ow-panel>
    <template #title> 셀 병합 </template>
    <ow-container>
      <ow-content>
        <ow-grid>
          <wj-flex-grid
            class="ow-grid"
            headersVisibility="Column"
            allowMerging="ColumnHeaders"
            :items-source="items"
            :initialized="onInitialized"
          >
            <wj-flex-grid-column header="열A" binding="a" width="*"></wj-flex-grid-column>
            <wj-flex-grid-column header="열B" binding="b" width="*"></wj-flex-grid-column>
            <wj-flex-grid-column header="열C" binding="c" width="*"></wj-flex-grid-column>
          </wj-flex-grid>
        </ow-grid>
      </ow-content>
    </ow-container>
  </ow-panel>
</template>
<script>
import { onMounted, reactive, toRefs } from 'vue';

import { Row } from '@grapecity/wijmo.grid';

import { BasicMergeManager, ColGroupMergeManager } from '@/utils/wijmo.grid';

export default {
  name: 'Dummy2',
  setup() {
    const state = reactive({
      flex: undefined,
      items: [
        { a: 'a', b: '', c: '' },
        { a: 'a', b: 'b2', c: 'c1' },
        { a: 'a', b: 'b3', c: 'c1' },
        { a: 'b', b: 'b3', c: 'c2' },
        { a: 'b', b: 'b5', c: 'c2' },
        { a: 'b', b: 'b6', c: 'c2' },
      ],
    });

    const onInitialized = (flex) => {
      state.flex = flex;
      // flex.mergeManager = new BasicMergeManager([], [1]);
      flex.mergeManager = new ColGroupMergeManager(0);
    };

    onMounted(() => {
      console.log('state.flex', state.flex);
    });

    return {
      ...toRefs(state),
      onInitialized,
    };
  },
};
</script>
<style lang="scss" scoped></style>
