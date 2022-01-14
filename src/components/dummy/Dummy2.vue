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
import { onMounted, reactive, toRefs } from 'vue';

import { MergeManager, CellRange, CellType } from '@grapecity/wijmo.grid';

class CustomMergeManager extends MergeManager {
  constructor(...args) {
    super();
    this.cols = args;
  }

  getMergedRange = function (panel, r, c, clip) {
    if (clip === 0) {
      clip = true;
    }
    const range = new CellRange(r, c);
    if (panel.cellType === CellType.Cell) {
      if (this.cols.length > 0 && this.cols.includes(c)) {
        for (let i = range.row, length = panel.rows.length - 1; i < length; i += 1) {
          if (panel.getCellData(i, range.col, true) != panel.getCellData(i + 1, range.col, true)) {
            break;
          }
          range.row2 = i + 1;
        }
        for (let i = range.row; i > 0; i -= 1) {
          if (panel.getCellData(i, range.col, true) != panel.getCellData(i - 1, range.col, true)) {
            break;
          }
          range.row = i - 1;
        }
      }
    }
    return range;
  };
}

export default {
  name: 'Dummy2',
  setup() {
    const state = reactive({
      flex: undefined,
      items: [
        { a: 'a', b: 'b1', c: 'c1' },
        { a: 'a', b: 'b2', c: 'c1' },
        { a: 'a', b: 'b3', c: 'c2' },
        { a: 'a', b: 'b3', c: 'c2' },
        { a: 'a', b: 'b5', c: 'c3' },
        { a: 'a', b: 'b6', c: 'c3' },
      ],
    });

    const onInitialized = (flex) => {
      state.flex = flex;
      flex.mergeManager = new CustomMergeManager(1);
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
