<template>
  <ow-flex-wrap class="size-full" col :class="$attrs.class" :style="$attrs.style">
    <ow-flex-item fix v-if="header">
      <ow-flex-item class="headline-wrap" align="center" to="left">
        <slot name="left">
          <h1 class="h1" v-if="title">{{ title }}</h1>
        </slot>
      </ow-flex-item>
      <ow-flex-item align="center" to="right">
        <slot name="right">
          <template v-for="button in buttons" :key="button">
            <button type="button" class="ow-btn type-state" @click="download(true)" v-if="button === 'ALL_EXCEL'">
              엑셀
            </button>
            <button type="button" class="ow-btn type-state" @click="download(false)" v-else-if="button === 'EXCEL'">
              엑셀
            </button>
            <button type="button" class="ow-btn type-state" @click="reset" v-else-if="button === 'RESET'">
              초기화
            </button>
            <button type="button" class="ow-btn type-state" @click="add" v-else-if="button === 'ADD'">추가</button>
            <button type="button" class="ow-btn type-state" @click="remove" v-else-if="button === 'REMOVE'">
              삭제
            </button>
            <button type="button" class="ow-btn type-state" @click="save" v-else-if="button === 'SAVE'">저장</button>
          </template>
        </slot>
      </ow-flex-item>
    </ow-flex-item>
    <ow-flex-item class="ow-grid-wrapper">
      <div class="ow-grid-wrap" :class="{ 'ow-grid-empty': empty }">
        <ow-flex-grid :initialized="init" v-bind="$attrs">
          <slot></slot>
        </ow-flex-grid>
      </div>
    </ow-flex-item>
    <ow-flex-item fix class="mt-10 mb-10" v-if="footer">
      <ow-flex-item to="left" align="center">
        <button type="button" class="ow-button type-icon mr-5">
          <i class="fas fa-cog fa-fw" />
        </button>
        <ow-select :items="pageSizeList" v-model="pageSize" style="--width: 80px" />
      </ow-flex-item>
      <ow-flex-item to="center" align="center">
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
            @page-click="(yg, pageNo) => read(pageNo)"
          ></b-pagination>
        </template>
      </ow-flex-item>
      <ow-flex-item to="right" align="center"> 전체 {{ totalCount }} 건 </ow-flex-item>
    </ow-flex-item>
  </ow-flex-wrap>
  <teleport to="#teleport">
    <ow-grid-excel-downloader ref="downloader"></ow-grid-excel-downloader>
  </teleport>
</template>
<script>
import _ from 'lodash';

import { reactive, ref, watch, toRefs, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { CollectionView, NotifyCollectionChangedAction, SortDescription } from '@grapecity/wijmo';
import { CellType, Column, SelMove, _NewRowTemplate } from '@grapecity/wijmo.grid';

import OwGridExcelDownloader from '@/components/wijmo/grid/OwGridExcelDownloader';
import OwFlexGrid from '@/components/wijmo/grid/OwFlexGrid';

import { instance } from '@/main';
import { t } from '@/plugins/i18n';

export const ROW_STATUS = {
  ADD: 'C',
  EDIT: 'U',
};

export default {
  name: 'OwGrid',
  inheritAttrs: false,
  components: {
    OwFlexGrid,
    OwGridExcelDownloader,
  },
  props: {
    initialized: Function,
    itemsSource: {
      type: [Array, CollectionView],
      default: () => [],
    },
    itemValidator: [Function, Object],
    allowStatus: Boolean,
    allowPushState: Boolean,
    header: {
      type: Boolean,
      default: true,
    },
    title: String,
    footer: {
      type: Boolean,
      default: true,
    },
    query: Object,
    paging: {
      type: Object,
      default: () => ({
        pageNo: 1,
        pageSize: 10,
        totalCount: 0,
      }),
    },
    buttons: {
      type: Array,
      default: () => ['RESET', 'ADD', 'REMOVE', 'SAVE'],
    },
    read: Function,
    remove: Function,
    save: Function,
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const downloader = ref(null);

    const state = reactive({
      empty: true,
      source: _.cloneDeep(props.itemsSource),
      query: _.cloneDeep(props.query) ?? {},
      pageNo: +(props.paging.pageNo ?? 1),
      pageSize: +(props.paging.pageSize ?? 10),
      totalCount: +(props.paging.totalCount ?? 0),
      sort: props.paging.sort ?? '',
      direction: props.paging.direction ?? '',
      pageSizeList: [5, 10, 20, 30, 50, 100, 150, 300, 500].map((size) => ({ name: `${size}건`, value: size })),
    });

    // [ISSUE | 2022.02.24] SortDescriptions의 기준이 String만 허용함. 그러므로 Symbol 대신 Symbol의 toString을 이용
    const Order = Symbol('Order').toString();
    const Index = Symbol('Index').toString();

    let s;

    const init = (...args) => {
      s = args.at(0);

      // Grid의 초기값 설정
      if (props.itemsSource instanceof CollectionView) {
        s.itemsSource = props.itemsSource;
      } else if (props.itemsSource instanceof Array) {
        s.itemsSource = new CollectionView();
        s.collectionView.sourceCollection = props.itemsSource;
      }
      state.totalCount = s.collectionView?.items.length ?? 0;

      // Required
      s.formatItem.addHandler((s, e) => {
        const row = e.getRow();
        const col = e.getColumn();
        if (row instanceof _NewRowTemplate) {
          if (CellType.Cell === e.panel.cellType && col.isRequired) {
            e.cell.classList.add('ow-grid-required');
          }
        }
      });

      // AllowStatus | RowStatus
      const statusHeader = new Column({
        binding: 'rowStatus',
        header: '번호',
        cellTemplate: (ctx) => {
          if (ctx.item) {
            switch (ctx.item.rowStatus) {
              case 'C':
                return '<button class="ow-btn type-icon"><span class="wj-glyph-asterisk"></span></button>';
              case 'U':
                return '<button class="ow-btn type-icon"><span class="wj-glyph-pencil"></span></button>';
              default:
                return ctx.item[Order];
            }
          }
          return ctx.text;
        },
        align: 'center',
        visible: props.allowStatus,
        quickAutoSize: true,
      });
      s.rowHeaders.columns.push(statusHeader);

      // CollectionView 설정
      s.collectionView.trackChanges = true;
      s.collectionView.useStableSort = true;
      s.collectionView.sortDescriptions.push(new SortDescription(Index, false));
      s.collectionView.itemsAdded.collectionChanged.addHandler(
        (c, e) => NotifyCollectionChangedAction.Add === e.action && (e.item.rowStatus = ROW_STATUS.ADD)
      );
      s.collectionView.itemsEdited.collectionChanged.addHandler(
        (c, e) => NotifyCollectionChangedAction.Add === e.action && (e.item.rowStatus = ROW_STATUS.EDIT)
      );
      s.collectionView.collectionChanged.addHandler((c, e) => {
        s.allowAddNew = false;
        console.log('e', e);
        if (NotifyCollectionChangedAction.Add === e.action) {
          e.item[Index] = e.item[Index] ?? e.index;
        }
      });
      s.collectionView.sourceCollectionChanged.addHandler((c) => {
        _.forEach(c.items, (item, index) => {
          item[Order] = state.totalCount - (state.pageNo - 1) * state.pageSize - index;
          item[Index] = item[Index] ?? c.items.length - index - 1;
        });
        state.empty = c.isEmpty;
        c.refresh();
      });

      // 사용자가 설정한 초기화 함수 호출
      if (props.initialized) {
        props.initialized(s);
      }

      // 조회
      if (props.read) {
        read();
      }
    };

    // 행 추가
    const add = () => {
      s.allowAddNew = true;
      setTimeout(() => s.startEditing(true, 0, s.columns.getNextCell(-1, SelMove.NextEditableCell)), 20);
    };

    // 행 삭제
    const remove = async () => {
      if (props.remove) {
        const items = Array.from(s?.selector?.checkedItems ?? []).map((item) => item.dataItem);
        if (_.isEmpty(items)) {
          return instance.alert(t('wijmo.grid.remove.noData'));
        }
        if (await instance.confirm(t('wijmo.grid.remove.confirm', [items.length]))) {
          // [TODO] 후처리 진행
          if (await props.remove(items)) {
            read(); // 검색 조건과 페이지 유지
          }
        }
      }
    };

    // 저장
    const save = async () => {
      if (props.save) {
        const addItems = Array.from(s.collectionView.itemsAdded ?? []);
        const editItems = Array.from(s.collectionView.itemsEdited ?? []);
        const removeItems = Array.from(s.collectionView.itemsRemoved ?? []);
        if (_.isEmpty(addItems) && _.isEmpty(editItems) && _.isEmpty(removeItems)) {
          return instance.alert(t('wijmo.grid.save.noData'));
        }
        const total = addItems.length + editItems.length + removeItems.length;
        if (await instance.confirm(t('wijmo.grid.save.confirm', [total]))) {
          // [TODO] 후처리 진행
          if (await props.save(addItems, editItems, removeItems)) {
            read(); // 검색 조건과 페이지 유지
          }
        }
      }
    };

    // 초기화
    const reset = async () => {
      if (await instance.confirm(t('wijmo.grid.reset.confirm'))) {
        s.collectionView.sourceCollection = _.cloneDeep(state.source);
      }
    };

    // 초기화
    const clear = () => {
      state.pageNo = 1;
      state.pageSize = 10;
      state.totalCount = 0;
      state.source = [];
      reset();
    };

    /**
     * 새로운 검색 조건으로 페이지를 조회합니다.
     * @param {Object} query - 검색 조건
     */
    const lookup = (query) => {
      state.query = query;
      read(1);
    };

    /**
     * 주어진 검색 조건으로 페이지를 이동합니다.
     * @param {Number} pageNo - 이동할 페이지 번호
     */
    const read = async (pageNo) => {
      if (typeof pageNo !== 'undefined') {
        state.pageNo = +pageNo;
      }
      if (props.read) {
        applier(
          await props.read(state.query, {
            pageNo: state.pageNo,
            pageSize: state.pageSize,
            sort: state.sort,
            direction: state.direction,
          })
        );
      }
      const root = s.hostElement.querySelector('[wj-part=root]');
      if (root) {
        root.scrollTop = 0;
      }
    };

    /**
     * 검색 이후 변수를 설정합니다.
     * @param {Object} query - 검색 조건
     * @param {Object} paging - 이동된 페이지 정보
     * @param {Number} paging.pageNo - 이동된 페이지 번호
     * @param {Number} paging.pageSize - 이동된 페이지 사이즈
     * @param {Number} totalCount - 조회된 데이터 개수
     * @param {Array} items - 조회된 데이터
     */
    const applier = ({ query, paging, totalCount, items }) => {
      state.query = query;
      state.pageNo = paging?.pageNo ?? 1;
      state.pageSize = paging?.pageSize ?? 10;
      state.totalCount = totalCount ?? 0;
      state.source = _.cloneDeep(items);
      s.collectionView.sourceCollection = items;
      if (props.allowPushState) {
        router.push({
          path: route.path,
          query: {
            ...state.query,
            pageNo: state.pageNo,
            pageSize: state.pageSize,
          },
        });
      }
    };

    const setCumstomColums = (cols, items) => {
      const columns = _.cloneDeep(
        Array.from(cols).map((col) => ({
          binding: col.binding,
          header: col.header,
          align: col.align,
          width: col.width,
          format: col.format,
        }))
      );
      const itemsSource = _.cloneDeep(Array.from(items));
      if (props.allowStatus) {
        columns.unshift(new Column({ binding: Order, header: '번호' }));
        for (let i = 0, length = itemsSource.length; i < length; i += 1) {
          const itemSource = itemsSource.at(i);
          itemSource[Order] = state.totalCount - (state.pageNo - 1) * state.pageSize - i;
        }
      }
      return {
        columns,
        itemsSource,
      };
    };

    const download = async (isAll) => {
      let columns, itemsSource;
      if (props.read && isAll) {
        const { items } = await props.read(state.query, {
          pageNo: 1,
          pageSize: state.totalCount,
        });
        ({ columns, itemsSource } = setCumstomColums(s.columns, items));
      } else {
        ({ columns, itemsSource } = setCumstomColums(s.columns, state.source));
      }
      downloader.value.exec(columns, itemsSource);
    };

    watch(
      () => state.pageSize,
      () => read(1)
    );

    return {
      downloader,
      ...toRefs(state),
      init,
      lookup,
      read,
      applier,
      add,
      save,
      remove,
      reset,
      clear,
      download,
    };
  },
};
</script>
<style lang="scss" scoped>
.headline-wrap {
  border-bottom: none;
}
.ow-grid-wrapper {
  flex-direction: column;
  min-height: var(--grid-min-height, var(--grid-height, none)) !important;
  max-height: var(--grid-max-height, var(--grid-height, none)) !important;
  .ow-grid-wrap {
    position: relative;
    &.ow-grid-empty {
      &::after {
        content: '검색 결과가 없습니다.';
        position: absolute;
        top: 15%;
        width: 100%;
        line-height: 35px;
        text-align: center;
        z-index: 999;
      }
    }
    :deep(.ow-grid-required) {
      &::before {
        position: absolute;
        content: '';
        width: 0;
        right: 0;
        top: -6px;
        border: 6px solid transparent;
        border-right-color: rgba(0, 0, 255, 1);
      }
    }
  }
  .ow-pagination {
    :deep(.page-link) {
      &[role='menuitemradio'] {
        width: 100%;
        padding: 4px 8px;
      }
    }
  }
}
</style>
