<template>
  <ow-flex-wrap col>
    <ow-flex-item v-if="headline">
      <ow-flex-item class="headline-wrap" align="center" to="left">
        <slot name="left">
          <h1 class="h1" v-if="title">{{ title }}</h1>
        </slot>
      </ow-flex-item>
      <ow-flex-item align="center" to="right">
        <slot name="right">
          <button type="button" class="ow-btn type-state" @click="">엑셀</button>
          <button type="button" class="ow-btn type-state" @click="reset">초기화</button>
          <button type="button" class="ow-btn type-state" @click="add">추가</button>
          <button type="button" class="ow-btn type-state" @click="">삭제</button>
        </slot>
      </ow-flex-item>
    </ow-flex-item>
    <ow-flex-item>
      <div class="ow-grid-wrap" :class="{ 'ow-grid-empty': empty }">
        <wj-flex-grid class="ow-grid" :initialized="init" v-bind="$attrs">
          <slot></slot>
        </wj-flex-grid>
      </div>
    </ow-flex-item>
    <ow-flex-item class="mt-10 mb-10" v-if="pagination">
      <ow-flex-item to="left">
        <button type="button" class="ow-button type-icon">
          <i class="fas fa-cog fa-fw" />
        </button>
        <ow-select :items="pageSizeList" v-model="pageSize" style="--width: 80px" />
      </ow-flex-item>
      <ow-flex-item to="center">
        <template v-if="totalCount > 0">
          <b-pagination
            class="ow-pagination"
            first-class="go-first"
            prev-class="go-prev"
            next-class="go-next"
            last-class="go-last"
            :total-rows="totalCount"
            :per-page="pageSize"
            :limit="10"
            v-model="pageNo"
            @page-click="pageClick"
          ></b-pagination>
        </template>
      </ow-flex-item>
      <ow-flex-item to="right">
        <div class="counter-board">전체 {{ totalCount }} 건</div>
      </ow-flex-item>
    </ow-flex-item>
  </ow-flex-wrap>
  <teleport to="#teleport">
    <ow-grid-excel-downloader ref="downloader"></ow-grid-excel-downloader>
  </teleport>
</template>
<script>
import _ from 'lodash';

import { reactive, ref, computed, watch, toRefs } from 'vue';

import {
  NotifyCollectionChangedAction,
  Tooltip,
  PopupPosition,
  ObservableArray,
  CollectionView,
} from '@grapecity/wijmo';
import {
  AllowDragging,
  AllowMerging,
  AllowPinning,
  AllowResizing,
  AllowSorting,
  HeadersVisibility,
  SelectionMode,
  Column,
  RowCol,
} from '@grapecity/wijmo.grid';
import { Selector } from '@grapecity/wijmo.grid.selector';
import { tooltip, tabindex, selector } from '@/utils/wijmo.grid';

import OwGridExcelDownloader from '@/components/wijmo/grid/OwGridExcelDownloader';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'NewOwGrid',
  inheritAttrs: false,
  components: {
    OwGridExcelDownloader,
  },
  props: {
    // @grapecity/wijmo.grid - S
    initialized: Function,
    itemsSource: {
      type: [Array, CollectionView],
      default: () => [],
    },
    allowDragging: {
      type: [Number, String],
      default: AllowDragging.None,
    },
    allowMerging: {
      type: [Number, String],
      default: AllowMerging.None,
    },
    allowPinning: {
      type: [Number, String],
      default: AllowPinning.None,
    },
    allowResizing: {
      type: [Number, String],
      default: AllowResizing.None,
    },
    allowSorting: {
      type: [Number, String],
      default: AllowSorting.None,
    },
    headersVisibility: {
      type: [Number, String],
      default: HeadersVisibility.All,
    },
    selectionMode: {
      type: [Number, String],
      default: SelectionMode.Row,
    },
    stickyHeaders: {
      type: Boolean,
      default: true,
    },
    newRowAtTop: {
      type: Boolean,
      default: true,
    },
    // @grapecity/wijmo.grid - E
    /////////////////////////////////////
    // @grapecity/wijmo.grid.selector - S
    selector: Boolean,
    // @grapecity/wijmo.grid.selector - E
    /////////////////////////////////////
    // @/utils/wijmo.grid - S
    tooltip: {
      type: [Object, Tooltip],
      default: () => ({
        position: PopupPosition.RightBottom,
        gap: 10,
        showAtMouse: true,
        showDelay: 300,
      }),
    },
    tabindex: {
      type: Boolean,
      default: true,
    },
    // @/utils/wijmo.grid - E
    title: String,
    headline: {
      type: Boolean,
      default: true,
    },
    // pagination
    pagination: Boolean,
    query: Object,
    paging: {
      type: Object,
      default: () => ({
        pageNo: 1,
        pageSize: 10,
        totalCount: 0,
      }),
    },
    read: Function,
  },
  setup(props, { emit }) {
    const state = reactive({
      grid: null,
      sourceCollection: _.cloneDeep(props.itemsSource),
      empty: computed(() => state.grid?.collectionView.items.length === 0),
      query: props.query ?? {},
      pageNo: props.paging.pageNo ?? 1,
      pageSize: props.paging.pageSize ?? 10,
      totalCount: props.paging.totalCount ?? 0,
      pageSizeList: [5, 10, 20, 30, 50, 100, 150, 300, 500].map((size) => ({ name: `${size}건`, value: size })),
    });

    const tooltip = (grid) => {
      const tooltip = props.tooltip instanceof Tooltip ? props.tooltip : new Tooltip(props.tooltip);
      grid.formatItem.addHandler((s, e) => tooltip.setTooltip(e.cell, e.cell.textContent));
    };

    const init = (grid) => {
      // Grid의 초기값 설정
      grid.allowDragging = props.allowDragging;
      grid.allowMerging = props.allowMerging;
      grid.allowPinning = props.allowPinning;
      grid.allowResizing = props.allowResizing;
      grid.allowSorting = props.allowSorting;
      grid.headersVisibility = props.headersVisibility;
      grid.selectionMode = props.selectionMode;
      grid.stickyHeaders = props.stickyHeaders;
      grid.newRowAtTop = props.newRowAtTop;
      grid.itemsSource = props.itemsSource;
      // 부가 기능 설정
      if (props.tooltip) {
        tooltip(grid);
      }
      if (props.tabindex) {
        tabindex(grid);
      }
      if (props.selector) {
        selector(grid);
      }
      if (grid.allowDragging & AllowDragging.Rows) {
        const dragHeader = new Column({
          binding: 'rowStatus',
          header: '&nbsp;',
          align: 'center',
        });
        grid.rowHeaders.columns.unshift(dragHeader);
      }
      // CollectionView 설정
      const { collectionView } = grid;
      // trackChanges를 true로 설정
      collectionView.trackChanges = true;
      // collection의 원본 설정
      collectionView.collectionChanged.addHandler((c, { action }) => {
        console.log('collection changed');
        if (NotifyCollectionChangedAction.Reset === action) {
          console.log('원본 변경');
          state.sourceCollection = _.cloneDeep(c.sourceCollection);
        }
      });
      // Grid 기능 설정

      // 사용자가 설정한 초기화 함수 호출
      if (props.initialized) {
        props.initialized(grid);
      }
      state.grid = grid;
    };

    // 행 추가
    const add = () => (state.grid.allowAddNew = true);

    // 초기화
    const reset = () => emit('update:items-source', state.sourceCollection);

    // 검색
    const read = async (pageNo) => {
      if (pageNo !== state.pageNo) {
      }
      if (props.read) {
        const {
          query,
          paging: { pageNo, pageSize, totalCount },
          items,
        } = await props.read(state.query, {
          pageNo: state.pageNo,
          pageSize: state.pageSize,
        });
        state.query = query;
        state.pageNo = pageNo;
        state.pageSize = pageSize;
        state.totalCount = totalCount;
        emit('update:items-source', items);
      }
    };

    const pageClick = () => read();

    watch(
      () => props.itemsSource,
      () => (state.grid.collectionView.sourceCollection = props.itemsSource)
    );

    return {
      ...toRefs(state),
      init,
      add,
      read,
      reset,
      pageClick,
    };
  },
};
</script>
<style lang="scss" scoped>
.headline-wrap {
  border-bottom: none;
}
.ow-grid-wrap {
  position: relative;
  &.ow-grid-empty {
    margin-bottom: 50px;
    overflow: visible;
    &::after {
      content: '검색 결과가 없습니다.';
      position: absolute;
      bottom: -35px;
      width: 100%;
      line-height: 35px;
      text-align: center;
      z-index: 999;
      border-radius: 0;
      border: 1px solid #d7dce3;
      border-top: none;
      transition: linear 0.5s;
    }
  }
  .ow-grid {
    border-right: none;
    border-bottom: none;
    :deep(.wj-header) {
      text-align: center;
    }
  }
}
</style>
