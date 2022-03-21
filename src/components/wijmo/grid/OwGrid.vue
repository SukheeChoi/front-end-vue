<template>
  <ow-flex-wrap class="size-full" col :class="$attrs.class" :style="$attrs.style">
    <ow-flex-item fix v-if="header">
      <ow-flex-item class="headline-wrap" align="center" to="left">
        <slot name="left">
          <h1 class="h1" v-if="title">{{ title }}</h1>
        </slot>
      </ow-flex-item>
      <ow-flex-item align="center" to="right">
        <slot name="right"> </slot>
        <template v-for="button in buttons" :key="button">
          <button type="button" class="ow-btn type-state" @click="download(true)" v-if="button === 'ALL_EXCEL'">
            엑셀
          </button>
          <button type="button" class="ow-btn type-state" @click="download(false)" v-else-if="button === 'EXCEL'">
            엑셀
          </button>
          <button type="button" class="ow-btn type-state" @click="reset" v-else-if="button === 'RESET'">초기화</button>
          <button type="button" class="ow-btn type-state" @click="add" v-else-if="button === 'ADD'">추가</button>
          <button type="button" class="ow-btn type-state" @click="internal_remove" v-else-if="button === 'REMOVE'">
            삭제
          </button>
          <button type="button" class="ow-btn type-state" @click="internal_save" v-else-if="button === 'SAVE'">
            저장
          </button>
        </template>
      </ow-flex-item>
    </ow-flex-item>
    <div class="ow-grid-wrap" :class="{ 'ow-grid-empty': totalCount === 0 }">
      <ow-flex-grid :initialized="init" v-bind="$attrs">
        <slot></slot>
      </ow-flex-grid>
    </div>
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
            @page-click="(yg, pageNo) => internal_read(pageNo)"
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

import { reactive, ref, watch, toRefs, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  CollectionView,
  NotifyCollectionChangedAction,
  NotifyCollectionChangedEventArgs,
  SortDescription,
} from '@grapecity/wijmo';
import { CellType, CellRange, Column, SelMove, _NewRowTemplate } from '@grapecity/wijmo.grid';

import OwGridExcelDownloader from '@/components/wijmo/grid/OwGridExcelDownloader';
import OwFlexGrid from '@/components/wijmo/grid/OwFlexGrid';

import { t } from '@/plugins/i18n';

import { objectWithoutProperties } from '@/utils';

const ROW_STATUS = {
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

    const dialog = inject('$dialog');

    const downloader = ref(null);

    const state = reactive({
      source: [],
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
      } else {
        s.itemsSource = new CollectionView();
      }
      state.source = _.cloneDeep(s.collectionView.items);
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
      const cv = s.collectionView;
      cv.trackChanges = true;
      cv.useStableSort = true;
      cv.sortDescriptions.push(new SortDescription(Index, false));
      cv.itemsAdded.collectionChanged.addHandler(
        (c, e) => NotifyCollectionChangedAction.Add === e.action && (e.item.rowStatus = ROW_STATUS.ADD)
      );
      cv.itemsEdited.collectionChanged.addHandler(
        (c, e) => NotifyCollectionChangedAction.Add === e.action && (e.item.rowStatus = ROW_STATUS.EDIT)
      );
      cv.collectionChanged.addHandler((c, e) => {
        s.allowAddNew = false;
        if (NotifyCollectionChangedAction.Add === e.action) {
          e.item[Index] = e.item[Index] ?? e.index;
        }
        // Tree Grid
        if (c.trackChanges && s.childItemsPath && NotifyCollectionChangedAction.Reset > e.action) {
          const getSourceContent = (indexes) => {
            let source = state.source;
            for (const index of indexes) {
              source = source.at(index);
              if (source[s.childItemsPath]) {
                source = source[s.childItemsPath];
              }
            }
            return source;
          };

          const recursiveTrackItemChanged = (items, indexes = []) => {
            for (let i = 0, length = items.length; i < length; i += 1) {
              const item = items.at(i);
              if (item === e.item) {
                let at = c.itemsEdited.indexOf(item);
                const item1 = objectWithoutProperties(item, 'rowStatus');
                const item2 = objectWithoutProperties(getSourceContent([...indexes, i]), 'rowStatus');
                if (c._sameContent(item1, item2)) {
                  c.itemsEdited.removeAt(at);
                  return true;
                }
                if (at < 0 && c.itemsAdded.indexOf(item) < 0) {
                  c.itemsEdited.push(item);
                } else if (at > -1) {
                  c.itemsEdited.onCollectionChanged(
                    new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Change, item, at)
                  );
                } else if ((at = c.itemsAdded.indexOf(item)) > -1) {
                  c.itemsEdited.onCollectionChanged(
                    new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Change, item, at)
                  );
                }
                return true;
              } else {
                if (item[s.childItemsPath] && recursiveTrackItemChanged(item[s.childItemsPath], [...indexes, i]) > -1) {
                  break;
                }
              }
            }
          };
          recursiveTrackItemChanged(c.sourceCollection);
        }
      });
      cv.sourceCollectionChanged.addHandler((c) => {
        _.forEach(_.map(s.rows, 'dataItem'), (item, index) => {
          item[Order] = state.totalCount - (state.pageNo - 1) * state.pageSize - index;
          item[Index] = item[Index] ?? c.items.length - index - 1;
        });
        c.refresh();
      });

      // selection이 변경되면 새로운 행을 추가한다.
      s.selectionChanging.addHandler((s, e) => {
        const row = e.getRow();
        if (row instanceof _NewRowTemplate) {
          s._edtHdl._commitRowEdits();
          setTimeout(() => s.startEditing(true, 0, s.columns.getNextCell(e.col, SelMove.NextEditableCell)), 20);
        }
      });

      // 사용자가 설정한 초기화 함수 호출
      if (props.initialized) {
        props.initialized(s);
      }

      // 조회
      if (props.read) {
        internal_read();
      }
    };

    // 행 추가
    const add = () => {
      s.allowAddNew = true;
      s.selection = new CellRange(0, s.columns.getNextCell(-1, SelMove.NextEditableCell));
      setTimeout(() => s.startEditing(true, 0, s.columns.getNextCell(-1, SelMove.NextEditableCell)), 20);
    };

    // 행 삭제
    const internal_remove = async () => {
      if (props.remove) {
        const items = Array.from(s?.selector?.checkedItems ?? []).map((item) => item.dataItem);
        if (_.isEmpty(items)) {
          return dialog.alert(t('wijmo.grid.remove.noData'));
        }
        if (await dialog.confirm(t('wijmo.grid.remove.confirm', [items.length]))) {
          // [TODO] 후처리 진행
          if (await props.remove(items)) {
            internal_read(); // 검색 조건과 페이지 유지
          }
        }
      }
    };

    // 저장
    const internal_save = async () => {
      if (props.save) {
        const addItems = Array.from(s.collectionView.itemsAdded ?? []);
        const editItems = Array.from(s.collectionView.itemsEdited ?? []);
        const removeItems = Array.from(s.collectionView.itemsRemoved ?? []);
        if (_.isEmpty(addItems) && _.isEmpty(editItems) && _.isEmpty(removeItems)) {
          return await dialog.alert(t('wijmo.grid.save.noData'));
        }
        const total = addItems.length + editItems.length + removeItems.length;
        if (await dialog.confirm(t('wijmo.grid.save.confirm', [total]))) {
          // [TODO] 후처리 진행
          if (await props.save(addItems, editItems, removeItems)) {
            internal_read(); // 검색 조건과 페이지 유지
          }
        }
      }
    };

    // 초기화(초기 조회된 내용으로)
    const reset = async (usingConfirm = true) => {
      if (usingConfirm) {
        if (!(await dialog.confirm(t('wijmo.grid.reset.confirm')))) {
          return;
        }
      }
      s.collectionView.sourceCollection = _.cloneDeep(state.source);
    };

    // 초기화(빈 테이블로)
    const clear = (...args) => {
      state.pageNo = 1;
      state.pageSize = 10;
      state.totalCount = 0;
      state.source = [];
      reset(...args);
    };

    /**
     * 새로운 검색 조건으로 페이지를 조회합니다.
     * @param {Object} query - 검색 조건
     */
    const lookup = (query) => {
      state.query = query;
      internal_read(1);
    };

    /**
     * 주어진 검색 조건으로 페이지를 이동합니다.
     * @param {Number} pageNo - 이동할 페이지 번호
     */
    const internal_read = async (pageNo) => {
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
      const root = s.hostElement?.querySelector('[wj-part=root]');
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
      if (s.collectionView) {
        s.collectionView.sourceCollection = _.cloneDeep(state.source);
      }
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
      () => internal_read(1)
    );

    return {
      downloader,
      ...toRefs(state),
      init,
      lookup,
      internal_read,
      applier,
      add,
      internal_save,
      internal_remove,
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
.ow-grid-wrap {
  position: relative;
  &.ow-grid-empty {
    &::after {
      content: '검색 결과가 없습니다.';
      position: absolute;
      top: 37px;
      width: 100%;
      line-height: 35px;
      text-align: center;
      z-index: 10;
    }
  }
  :deep(.ow-grid-required) {
    &::after {
      position: absolute;
      content: '';
      width: 0;
      right: 0;
      top: -14px;
      border: 14px solid transparent;
      border-right-color: rgba(0, 0, 255, 1);
    }
  }
  :deep(.wj-state-invalid:not(.wj-header)) {
    border-top: none;
    border-left: none;
    border-right: 1px solid rgba(215, 220, 227, 1);
    border-bottom: 1px solid rgba(215, 220, 227, 1);
    &::after {
      top: -14px;
      right: 0;
      border: 14px solid transparent;
      border-right-color: red;
    }
  }
}
.ow-pagination {
  :deep(.page-link) {
    &[role='menuitemradio'] {
      width: 100%;
      min-width: 24px;
      padding: 4px 4px;
    }
  }
}
</style>
