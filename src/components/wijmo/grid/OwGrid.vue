<template>
  <ow-flex-wrap class="size-full" col>
    <ow-flex-item fix v-if="headline">
      <ow-flex-item class="headline-wrap" align="center" to="left">
        <slot name="left">
          <h1 class="h1" v-if="title">{{ title }}</h1>
        </slot>
      </ow-flex-item>
      <ow-flex-item align="center" to="right">
        <slot name="right">
          <button type="button" class="ow-btn type-state" @click="allowRowsExcelDownload">엑셀1</button>
          <button type="button" class="ow-btn type-state" @click="currentRowsExcelDownload">엑셀2</button>
          <button type="button" class="ow-btn type-state" @click="reset">초기화</button>
          <button type="button" class="ow-btn type-state" @click="add">추가</button>
          <button type="button" class="ow-btn type-state" @click="remove">삭제</button>
          <button type="button" class="ow-btn type-state" @click="save">저장</button>
        </slot>
      </ow-flex-item>
    </ow-flex-item>
    <ow-flex-item class="has-grid">
      <div class="ow-grid-wrap" :class="{ 'ow-grid-empty': empty }">
        <ow-flex-grid :initialized="init" v-bind="$attrs">
          <slot></slot>
        </ow-flex-grid>
      </div>
    </ow-flex-item>
    <ow-flex-item fix class="mt-10 mb-10" v-if="allowPagination">
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
            @page-click="(yg, pageNo) => read(pageNo)"
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
import { useRoute, useRouter } from 'vue-router';

import { CollectionView, NotifyCollectionChangedAction, SortDescription } from '@grapecity/wijmo';
import { Column } from '@grapecity/wijmo.grid';

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
    allowPagination: { type: Boolean, default: true },
    title: String,
    headline: {
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
    read: Function,
    remove: Function,
    save: Function,
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const downloader = ref(null);

    const state = reactive({
      grid: null,
      source: _.cloneDeep(props.itemsSource),
      empty: computed(() => !!state.grid?.collectionView.isEmpty),
      query: _.cloneDeep(props.query) ?? {},
      pageNo: +(props.paging.pageNo ?? 1),
      pageSize: +(props.paging.pageSize ?? 10),
      totalCount: +(props.paging.totalCount ?? 0),
      sort: props.paging.sort ?? '',
      direction: props.paging.direction ?? '',
      pageSizeList: [5, 10, 20, 30, 50, 100, 150, 300, 500].map((size) => ({ name: `${size}건`, value: size })),
    });

    const init = (s) => {
      // state 설정
      state.grid = s;

      // Grid의 초기값 설정
      if (props.itemsSource) {
        s.itemsSource = props.itemsSource;
        state.totalCount = s.collectionView.items.length ?? 0;
      }

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
                return ctx.item.__order__;
            }
          }
          return ctx.text;
        },
        align: 'center',
        visible: props.allowStatus,
      });
      s.rowHeaders.columns.push(statusHeader);

      // CollectionView 설정
      s.collectionView.trackChanges = true;
      s.collectionView.useStableSort = true;
      s.collectionView.sortDescriptions.push(new SortDescription('__index__', false));
      s.collectionView.itemsAdded.collectionChanged.addHandler(
        (c, e) => NotifyCollectionChangedAction.Add === e.action && (e.item.rowStatus = ROW_STATUS.ADD)
      );
      s.collectionView.itemsEdited.collectionChanged.addHandler(
        (c, e) => NotifyCollectionChangedAction.Add === e.action && (e.item.rowStatus = ROW_STATUS.EDIT)
      );
      s.collectionView.collectionChanged.addHandler((c, e) => {
        state.grid.allowAddNew = false;
        if (NotifyCollectionChangedAction.Reset === e.action) {
          for (let i = 0, length = c.items.length; i < length; i += 1) {
            const item = c.items.at(i);
            item.__order__ = item.__order__ ?? state.totalCount - (state.pageNo - 1) * state.pageSize - i;
            item.__index__ = item.__index__ ?? length - i - 1;
          }
        } else if (NotifyCollectionChangedAction.Add === e.action) {
          e.item.__index__ = e.item.__index__ ?? e.index;
        }
      });
      s.collectionView.onCollectionChanged();
      // s.collectionView.getError = (item, prop, parsing) => {
      //   console.log('get error', item, prop, parsing);
      //   let b = '';
      //   const a = async () => {
      //     if (props.itemValidator[prop] instanceof Function && props.itemValidator[prop](item[prop])) {
      //       b = 'bbbbbbbb';
      //       return await props.itemValidator[prop](item[prop]);
      //     }
      //   };
      //   a();
      //   console.log('b', b);

      //   return null;
      // };

      // Item Validator
      s.itemValidator = (r, c, p) => {
        // console.log('itemValidator', r, c);
        if (props.itemValidator) {
          if (props.itemValidator instanceof Function) {
            return props.itemValidator(r, c, p);
          } else if (props.itemValidator instanceof Object) {
            const { dataItem: item } = s.rows[r];
            const { binding: prop } = s.columns[c];
            if (props.itemValidator[prop]) {
              return props.itemValidator[prop](item[prop]);
            }
          }
        }
      };

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
      state.grid.allowAddNew = true;
    };

    // 행 삭제
    const remove = async () => {
      if (props.remove) {
        const items = Array.from(state.grid?.selector?.checkedItems ?? []).map((item) => item.dataItem);
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
        const addItems = Array.from(state.grid?.collectionView.itemsAdded ?? []);
        const editItems = Array.from(state.grid?.collectionView.itemsEdited ?? []);
        if (_.isEmpty(addItems) && _.isEmpty(editItems)) {
          return instance.alert(t('wijmo.grid.save.noData'));
        }
        if (await instance.confirm(t('wijmo.grid.save.confirm', [addItems.length + editItems.length]))) {
          // [TODO] 후처리 진행
          if (await props.save(addItems, editItems)) {
            read(); // 검색 조건과 페이지 유지
          }
        }
      }
    };

    // 초기화
    const reset = async () => {
      if (await instance.confirm(t('wijmo.grid.reset.confirm'))) {
        state.grid.collectionView.sourceCollection = _.cloneDeep(state.source);
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

    // 검색(새로운 검색 조건 설정)
    const lookup = (query) => {
      state.query = query;
      read(1);
    };

    // 검색(주어진 검색 조건으로 페이지 이동)
    const read = async (pageNo) => {
      if (typeof pageNo !== 'undefined') {
        state.pageNo = +pageNo;
      }
      if (props.read) {
        const {
          query,
          // paging: { pageNo, pageSize },
          paging,
          totalCount,
          items,
        } = await props.read(state.query, {
          pageNo: state.pageNo,
          pageSize: state.pageSize,
          sort: state.sort,
          direction: state.direction,
        });
        state.query = query;
        state.pageNo = paging?.pageNo ?? 1;
        state.pageSize = paging?.pageSize ?? 10;
        state.totalCount = totalCount ?? 0;
        state.source = _.cloneDeep(items);
        state.grid.collectionView.sourceCollection = items;
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
        columns.unshift(new Column({ binding: '__order__', header: '번호' }));
        for (let i = 0, length = itemsSource.length; i < length; i += 1) {
          const itemSource = itemsSource.at(i);
          itemSource.__order__ = state.totalCount - (state.pageNo - 1) * state.pageSize - i;
        }
      }
      return {
        columns,
        itemsSource,
      };
    };

    const allowRowsExcelDownload = async () => {
      if (props.read) {
        const { items } = await props.read(state.query, {});
        const { columns, itemsSource } = setCumstomColums(state.grid.columns, items);
        downloader.value.exec(columns, itemsSource);
      } else {
        currentRowsExcelDownload();
      }
    };

    const currentRowsExcelDownload = () => {
      const { columns, itemsSource } = setCumstomColums(state.grid.columns, state.source);
      downloader.value.exec(columns, itemsSource);
    };

    watch(
      () => state.pageSize,
      () => read(1)
    );

    watch(
      () => props.itemsSource,
      () => {
        if (props.itemsSource) {
          state.grid.sourceCollection = props.itemsSource;
          if (props.itemsSource instanceof CollectionView) {
            state.totalCount = props.itemsSource.items.length;
          } else {
            state.totalCount = props.itemsSource.length;
          }
        }
      }
    );

    return {
      downloader,
      ...toRefs(state),
      init,
      lookup,
      read,
      add,
      save,
      remove,
      reset,
      clear,
      allowRowsExcelDownload,
      currentRowsExcelDownload,
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
      top: 35px;
      width: 100%;
      line-height: 35px;
      text-align: center;
      z-index: 999;
      border-radius: 0;
      border: 1px solid #d7dce3;
      border-top: none;
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
.ow-pagination {
  :deep(.page-link) {
    &[role='menuitemradio'] {
      width: 100%;
      padding: 4px 8px;
    }
  }
}
</style>
