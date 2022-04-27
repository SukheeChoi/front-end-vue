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
          <button type="button" class="ow-btn type-state" @click="resetRows" v-else-if="button === 'RESET'">
            초기화
          </button>
          <button type="button" class="ow-btn type-state" @click="addNewRow" v-else-if="button === 'ADD'">추가</button>
          <button type="button" class="ow-btn type-state" @click="removeRows" v-else-if="button === 'REMOVE'">
            삭제
          </button>
          <button type="button" class="ow-btn type-state" @click="saveRows" v-else-if="button === 'SAVE'">저장</button>
        </template>
      </ow-flex-item>
    </ow-flex-item>
    <div class="ow-grid-wrap" :class="{ 'ow-grid-empty': isEmpty }">
      <ow-flex-grid :initialized="initialize" v-bind="$attrs">
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
            @page-click="(yg, pageNo) => readRows(pageNo)"
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

import { reactive, ref, watch, toRefs, inject, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  CollectionView,
  ObservableArray,
  NotifyCollectionChangedAction as ChangedAction,
  NotifyCollectionChangedEventArgs as ChangedEvent,
  SortDescription,
} from '@grapecity/wijmo';
import {
  CellType,
  // CellRange,
  Column,
  // SelMove,
  _NewRowTemplate,
} from '@grapecity/wijmo.grid';

import OwGridExcelDownloader from '@/components/grid/OwGridExcelDownloader';
import OwFlexGrid from '@/components/grid/OwFlexGrid';

import { t } from '@/plugins/i18n';

const SYMBOL_ORDER = Symbol('Order');
const SYMBOL_INDEX = Symbol('Index');
const SYMBOL_ROW_STATUS = Symbol('RowStatus');

const SYMBOL_VALIDATOR = Symbol('Validator');

const StatusAction = { Add: 'C', Edit: 'U' };

const PAGE_SIZE_LIST = [5, 10, 20, 30, 50, 100, 150, 300, 500].map((PAGE_SIZE) => ({
  name: `${PAGE_SIZE}건`,
  value: PAGE_SIZE,
}));

const PM = new Proxy({}, {});

const ROW_NUM = t('grid.header.rownum');

function createProxyGrid(grid) {
  return new Proxy(grid, {
    get(target, prop, receiver) {
      if (prop === 'findRow') {
        return Reflect.get(target, '_findRow', receiver);
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      if (prop === 'allowAddNew') {
        console.error('FlexGrid의 allowAddNew 대신 CollectionView의 addNew를 이용해주세요.');
        return false;
      }
      return Reflect.set(target, prop, value, receiver);
    },
  });
}

function createProxyCollectionView(collectionView) {
  return new Proxy(collectionView, {
    get(target, prop, receiver) {
      if (prop === 'origin') {
        return Reflect.get(target, '_orgVals', receiver);
      }
      if (prop === 'itemsAdded' || prop === 'itemsEdited' || prop === 'itemsRemoved') {
        return Reflect.get(target, prop, receiver) ?? new ObservableArray();
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      if (prop === 'sourceCollection') {
        const values = value ?? [];
        if (!Array.isArray(values)) {
          console.error('Array expected.');
          return false;
        }
        const items = values.map((value, index) => {
          const rowStatus = value.rowStatus;
          const item = createProxyItem(value);

          item[SYMBOL_INDEX] = values.length - index;
          return item;
        });
        return Reflect.set(target, prop, items, receiver);
      }
      return Reflect.set(target, prop, value, receiver);
    },
  });
}

function createProxyItem(item) {
  if (isProxy(item)) {
    return item;
  }
  // rowStatus를 Symbol(RowStatus)로 변경
  if (Reflect.set(item, SYMBOL_ROW_STATUS, item.rowStatus)) {
    Reflect.deleteProperty(item, 'rowStatus');
  }
  return new Proxy(item, {
    get(target, prop, receiver) {
      if (prop === SYMBOL_ORDER.description) {
        return Reflect.get(target, SYMBOL_ORDER, receiver);
      }
      if (prop === SYMBOL_INDEX.description) {
        return Reflect.get(target, SYMBOL_INDEX, receiver);
      }
      if (prop === SYMBOL_ROW_STATUS.description || prop === 'rowStatus') {
        return Reflect.get(target, SYMBOL_ROW_STATUS, receiver);
      }
      if (prop === '__isProxy') {
        return true;
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      if (prop === 'rowStatus') {
        return Reflect.set(target, SYMBOL_ROW_STATUS, value, receiver);
      }
      return Reflect.set(target, prop, value, receiver);
    },
  });
}

function isProxy(item) {
  return !!(item && item.__isProxy);
}

function toRawItems(items, containRowStatus = true) {
  return Array.from(items).map((item) => {
    const raw = {};
    for (const key in item) {
      raw[key] = item[key];
    }
    if (item[SYMBOL_ROW_STATUS] && containRowStatus) {
      raw.rowStatus = item[SYMBOL_ROW_STATUS];
    }
    return raw;
  });
}

export default {
  name: 'OwGrid',
  inheritAttrs: false,
  components: {
    OwFlexGrid,
    OwGridExcelDownloader,
  },
  props: {
    initialized: Function,
    newItemCreator: Function,
    validator: Function,
    itemsSource: { type: [Array, CollectionView], default: () => [] },
    allowStatus: Boolean,
    allowPushState: Boolean,
    query: Object,
    paging: { type: Object, default: () => ({ pageNo: 1, pageSize: 10, totalCount: 0 }) },
    direction: { type: String, default: 'ASC', validator: (value) => ['ASC', 'DESC'].includes(value) },
    read: Function,
    remove: Function,
    save: Function,
    export: Function,
    header: { type: Boolean, default: true },
    title: String,
    footer: { type: Boolean, default: true },
    buttons: { type: Array, default: () => ['RESET', 'ADD', 'REMOVE', 'SAVE'] },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const $dialog = inject('$dialog');

    const state = reactive({
      statusRowHeaderIndex: -1,
      startOrderingNumber: 1,
      isEmpty: true,
      query: _.cloneDeep(props.query ?? {}),
      pageNo: +props.paging.pageNo || 1,
      pageSize: +props.paging.pageSize || 10,
      totalCount: +props.paging.totalCount || 0,
      pageSizeList: PAGE_SIZE_LIST,
    });
    console.log('grid state', state);
    const setRowHeaders = () => {
      const grid = state.grid;
      const columns = grid.rowHeaders.columns;
      const statusRowHeader = new Column({
        binding: SYMBOL_ROW_STATUS.description,
        header: ROW_NUM,
        align: 'center',
        visible: props.allowStatus,
        quickAutoSize: true,
        cellTemplate: (ctx) => {
          if (ctx.item) {
            switch (ctx.item[SYMBOL_ROW_STATUS]) {
              case StatusAction.Add:
                return '<button class="ow-btn type-icon"><span class="wj-glyph-asterisk"></span></button>';
              case StatusAction.Edit:
                return '<button class="ow-btn type-icon"><span class="wj-glyph-pencil"></span></button>';
              default:
                return ctx.item[SYMBOL_ORDER];
            }
          }
          return ctx.text;
        },
      });
      columns.insert((state.statusRowHeaderIndex = columns.length), statusRowHeader);
    };

    const setDraggedRow = () => {
      const grid = state.grid;
      grid.draggedRow.addHandler((s, e) => {
        console.log('dragging rows', s, e);
        setOrderingNumbers();
      });
    };

    const setOrderingNumbers = () => {
      const collector = state.collector;
      const items = collector.sourceCollection;
      if (props.direction === 'ASC') {
        for (let i = 0, length = items.length; i < length; i += 1) {
          const item = items.at(i);
          item[SYMBOL_ORDER] = state.startOrderingNumber + i;
        }
      } else {
        for (let i = 0, length = items.length; i < length; i += 1) {
          const item = items.at(i);
          item[SYMBOL_ORDER] = state.startOrderingNumber - i;
        }
      }
      state.grid.invalidate();
    };

    const setValidator = () => {
      console.log('call setValidator');
      for (const column of state.grid.columns) {
        // const validator = props
        // if () {

        // }
        column[SYMBOL_VALIDATOR] = props;
      }
    };

    const setCollectionView = () => {
      const collector = state.collector;
      // 추적 설정
      collector.trackChanges = true;
      // 정렬 설정
      collector.useStableSort = true;
      collector.sortDescriptions.push(new SortDescription(SYMBOL_INDEX.description, false));
      collector.collectionChanged.addHandler((c, e) => {
        console.log('컬렉터 핸들러: ', e);
        const item = e.item;
        switch (e.action) {
          case ChangedAction.Add:
            item[SYMBOL_INDEX] = e.index + 1;
            break;
          case ChangedAction.Remove:
            break;
          case ChangedAction.Change:
            break;
          case ChangedAction.Reset:
            break;
        }
        state.isEmpty = collector.isEmpty;
      });
      // 추가된 아이템에 대해
      collector.itemsAdded.collectionChanged.addHandler((c, e) => {
        console.log('추가 컬렉터 핸들러: ', e);
        const { item } = e;
        switch (e.action) {
          case ChangedAction.Add:
            item[SYMBOL_ROW_STATUS] = StatusAction.Add;
            break;
          case ChangedAction.Remove:
            delete item[SYMBOL_ROW_STATUS];
        }
      });
      // 수정된 아이템에 대해
      collector.itemsEdited.collectionChanged.addHandler((c, e) => {
        console.log('수정 컬렉터 핸들러: ', e);
        const { item } = e;
        switch (e.action) {
          case ChangedAction.Add:
          case ChangedAction.Change:
            item[SYMBOL_ROW_STATUS] = StatusAction.Edit;
            break;
          case ChangedAction.Remove:
            delete item[SYMBOL_ROW_STATUS];
        }
      });
      // 원본 아이템에 대해
      collector.sourceCollectionChanged.addHandler(() => {
        console.log('원본 컬렉터 핸들러');
        setOrderingNumbers();
      });
    };

    const initialize = (s) => {
      console.log('s', s, state);

      // 프록시 그리드 생성
      const grid = (state.grid = createProxyGrid(s));

      // 행 머리글 생성
      setRowHeaders();

      // 행 드래그 관련 이벤트 핸들러 생성
      setDraggedRow();

      // 데이터 유효성 검사
      setValidator();

      if (props.itemsSource instanceof CollectionView) {
        grid.itemsSource = props.itemsSource;
      }

      // 프록시 컬렉션 생성
      const collector = (state.collector = createProxyCollectionView(grid.editableCollectionView));

      setCollectionView();

      if (props.itemsSource instanceof Array) {
        collector.sourceCollection = props.itemsSource;
      }

      // 행 추가
      PM.addNewRow = (newDataItem = null) => collector.addNew(newDataItem, true);
      // 행 삭제
      PM.removeRows = async () => {
        const checkedItems = grid.selector.checkedItems;
        if (checkedItems.length === 0) {
          return $dialog.alert(t('grid.remove.noData'));
        }
        if (!(await $dialog.confirm(t('grid.remove.confirm', [checkedItems.length])))) {
          return;
        }
        // 새로 추가된 행은 바로 삭제
        const addNewRows = checkedItems.filter((row) => row.dataItem[SYMBOL_ROW_STATUS] === StatusAction.Add);
        for (const addNewRow of addNewRows) {
          collector.remove(addNewRow.dataItem);
          checkedItems.remove(addNewRow);
        }
        const itemsRemoved = toRawItems(checkedItems.map((row) => row.dataItem));
        if (checkedItems.length > 0 && props.remove && (await props.remove(itemsRemoved))) {
          const carryAddDataItems = toRawItems(collector.itemsAdded);
          await PM.readRows();
          if (carryAddDataItems.length > 0) {
            for (const carryAddDataItem of carryAddDataItems) {
              PM.addNewRow(createProxyItem(carryAddDataItem));
            }
          }
        }
      }; // props.remove
      // 조회
      PM.readRows = async (pageNo) => {
        if (typeof pageNo !== 'undefined') {
          state.pageNo = +pageNo;
        }
        if (props.read) {
          applier(
            await props.read(state.query, {
              pageNo: state.pageNo,
              pageSize: state.pageSize,
            })
          );
        }
        const root = grid.hostElement?.querySelector('[wj-part=root]');
        if (root) {
          root.scrollTop = 0;
        }
        setTimeout(() => s.refreshCells(false), 30);
      }; // props.read
      // 저장
      PM.saveRows = async () => {
        if (props.save) {
          const itemsAdded = toRawItems(collector.itemsAdded);
          const itemsEdited = toRawItems(collector.itemsEdited);
          const itemsRemoved = toRawItems(collector.itemsRemoved);
          const length = itemsAdded.length + itemsEdited.length + itemsRemoved.length;
          if (length === 0) {
            return await $dialog.alert(t('grid.save.noData'));
          }
          if (await $dialog.confirm(t('grid.save.confirm', [length]))) {
            if (await props.save(itemsAdded, itemsEdited, itemsRemoved)) {
              PM.readRows();
            }
          }
        }
      }; // props.save
      // 초기화
      PM.resetRows = () => {
        const origin = collector.origin;
        if (origin && origin.size > 0) {
          for (const [n, o] of origin) {
            const action = ChangedAction.Change;
            const item = _.assign(n, o);
            const index = grid.findRow(item);
            const event = new ChangedEvent(action, item, index);
            collector.onCollectionChanged(event);
          }
        }
        grid.invalidate();
      };
      // 엑셀 내보내기
      PM.exportRows = () => {};

      if (props.initialized) {
        props.initialized(s);
      }

      // 행 추가에 대한 아이템 설정
      const newItemCreator = props.newItemCreator
        ? props.newItemCreator.bind()
        : collector.newItemCreator
        ? collector.newItemCreator.bind()
        : () => ({});

      collector.newItemCreator = () => {
        return createProxyItem(newItemCreator());
      };

      if (props.read) {
        PM.readRows();
      }
    };

    // 행 추가
    const addNewRow = () => PM.addNewRow();
    // 행 삭제
    const removeRows = () => PM.removeRows();
    // 조회
    const readRows = (pageNo) => PM.readRows(pageNo);
    // 저장
    const saveRows = () => PM.saveRows();
    // 초기화
    const resetRows = () => PM.resetRows();
    // 익스포트
    const exportRows = () => PM.exportRows();

    // 새 조회
    const lookup = (query = {}) => {
      state.query = _.cloneDeep(query);
      readRows(1);
    };

    // 조회 적용
    const applier = ({ query, paging, totalCount, items }) => {
      state.query = _.cloneDeep(query);
      state.pageNo = +paging?.pageNo || 1;
      state.pageSize = +paging?.pageSize || 10;
      state.totalCount = +totalCount || 0;
      state.collector.sourceCollection = items;
      state.collector.clearChanges();
      const orderingNumber = (state.pageNo - 1) * state.pageSize;
      if (props.direction === 'DESC') {
        state.startOrderingNumber = state.totalCount - orderingNumber;
      } else {
        state.startOrderingNumber = orderingNumber + 1;
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
      console.log('props.direction, state.startOrderingNumber', props.direction, state.startOrderingNumber);
    };

    watch(
      () => props.allowStatus,
      (visible) => {
        if (state.statusRowHeaderIndex > -1) {
          state.grid.rowHeaders.columns.at(state.statusRowHeaderIndex).visible = visible;
        }
      }
    );

    watch(
      () => [state.startOrderingNumber, props.direcion],
      () => setOrderingNumbers()
    );

    watch(
      () => state.pageSize,
      () => readRows(1)
    );

    // watch(
    //   () => route.query,
    //   () => {
    //     state.query = route.query;
    //     state.pageNo = +route.query.pageNo || state.pageNo;
    //     state.pageSize = +route.query.pageSize || state.pageSize;
    //     readRows();
    //   }
    // );

    return {
      ...toRefs(state),
      initialize,
      addNewRow,
      removeRows,
      readRows,
      saveRows,
      resetRows,
      exportRows,
      lookup,
      applier,
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
  :deep(.page-item) {
    &[role='presentation'] {
      width: auto;
    }
  }
  :deep(.page-link) {
    &[role='menuitemradio'] {
      width: auto;
      min-width: 24px;
      padding: 4px 4px;
    }
  }
}
</style>
