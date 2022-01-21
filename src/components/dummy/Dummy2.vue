<template>
  <ow-panel>
    <template #title> 셀 병합 </template>
    <ow-container>
      <ow-content>
        <ow-grid>
          <wj-flex-grid class="ow-grid" headersVisibility="Column" :items-source="items" :initialized="onInitialized">
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
import { reactive, toRefs } from 'vue';

import { SimpleMergeManager, GroupMergeManager } from '@/utils/wijmo.grid';

export default {
  name: 'Dummy2',
  setup() {
    const state = reactive({
      flex: undefined,
      items: [
        { a: 'a', b: 'b1', c: 'c1' },
        { a: 'a', b: 'b1', c: 'c1' },
        { a: 'a', b: 'b2', c: 'c1' },
        { a: 'b', b: 'b2', c: 'c1' },
        { a: 'b', b: 'b3', c: 'c1' },
        { a: 'b', b: 'b3', c: 'c1' },
      ],
    });

    const onInitialized = (flex) => {
      state.flex = flex;
      console.log(flex.onCellEditEnded);
      flex.onCellEditEnded = (...args) => {
        console.log('args', args);
      };
      flex.mergeManager = new SimpleMergeManager();
      // flex.mergeManager = new GroupMergeManager(0);
    };

    return {
      ...toRefs(state),
      onInitialized,
    };
  },
};
</script>
<style lang="scss" scoped></style>
