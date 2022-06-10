<template>
  <div>
    <template v-if="isNotBlank">
      <div class="d-flex justify-content-between align-items-end mt-10" ref="header">
        <slot name="left">
          <h1 class="h1">그리드</h1>
        </slot>
        <slot name="right">
          <template v-if="editable">
            <button type="button" class="ow-btn type-state" v-if="insert" @click="addNew">추가</button>
          </template>
        </slot>
      </div>
    </template>
    <div class="ow-grid-wrap mt-8 mb-8">
      <ow-flex-grid :initialized="initialize" v-bind="$attrs">
        <slot></slot>
      </ow-flex-grid>
    </div>
    <div class="d-flex justify-content-end align-items-center">
      <div>전체 {{ totalCount }} 건</div>
    </div>
    <ow-flex-grid-editor v-if="editable" :src="[grid]" :type="editorSize">
      <template #default="item">
        <slot name="editor" :item="item.data"> </slot>
      </template>
    </ow-flex-grid-editor>
  </div>
</template>

<script>
import OwFlexGrid from '@/components/grid/new/OwFlexGrid';
import OwFlexGridEditor from '@/components/grid/new/OwFlexGridEditor';
import {
  //
  setCss,
  evalTemplate,
  isFunction,
  //
  EventArgs,
} from '@grapecity/wijmo';
import {
  //
  CellType,
  CellFactory,
  //
  FlexGrid,
  FormatItemEventArgs,
} from '@grapecity/wijmo.grid';
import {
  //
  TreeGridRestCollectionView,
} from '@/model';
import {
  //
  reactive,
  watch,
  toRefs,
  ref,
  nextTick,
  onMounted,
} from 'vue';

/**
 * 그리드의 프록시 객체 생성
 *
 * @param {FlexGrid} s
 */
function asProxyFlexGrid(s) {
  return new Proxy(s, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      if (prop === 'itemsSource') {
        console.error('TreeGridRestCollectionView는 itemsSource를 설정할 수 없습니다.');
        return true;
      }
      return Reflect.set(target, prop, value, receiver);
    },
  });
}

const DEFULT_CHILD_ITEM_PATH = 'children';
const TREE_INDENT = 20;

export default {
  name: 'OwTreeGrid',
  components: {
    OwFlexGrid,
    OwFlexGridEditor,
  },
  inheritAttrs: false,
  props: {
    initialized: Function,
    query: Object,
    read: Function,
    insert: Function,
    update: Function,
    remove: Function,
    editable: Boolean,
    editorSize: { type: String, default: 'L' },
    childItemsPath: { type: String, default: DEFULT_CHILD_ITEM_PATH },
  },
  setup(props) {
    const header = ref();

    const state = reactive({
      grid: null,
      query: Object.assign({}, props.query),
      totalCount: 0,
      api: {
        getItems: props.read,
        addItem: props.insert,
        patchItem: props.update,
        deleteItem: props.remove,
      },
      isNotBlank: true,
    });

    /**
     * 페이지 정보 설정
     *
     * @param {GridRestCollectionView} c
     * @param {EventArgs} e
     */
    const setPage = (c) => {
      const { grid: s, totalItemCount } = c;
      state.totalCount = totalItemCount;
      s.collapseGroupsToLevel(1);
    };

    /**
     * 접힘 셀 설정
     *
     * @param {FlexGrid} s
     * @param {FormatItemEventArgs} e
     */
    const setCollapseCell = (s, e) => {
      const row = e.getRow();
      const col = e.getColumn();
      const {
        cell,
        panel: { cellType },
      } = e;
      // 셀에 대해서만
      if (CellType.Cell === cellType) {
        // 들여쓰기 설정
        if (col.index === 0 && !row.hasChildren) {
          const paddingLeft = s.treeIndent * (row.level + 1) + s._cellPadLeft;
          setCss(cell, { paddingLeft });
        }
        // 셀 템플릿 설정
        if (col.cellTemplate && s.columns.firstVisibleIndex === col.index && row.hasChildren) {
          const childNodes = cell.childNodes;
          for (const childNode of childNodes) {
            if (childNode instanceof Text) {
              cell.removeChild(childNode);
            }
          }
          const ctx = CellFactory._tplCtx;
          ctx.value = col._binding.getValue(row.dataItem);
          ctx.text = cell.innerHTML;
          ctx.item = row.dataItem;
          ctx.row = row;
          ctx.col = col;
          const ct = col.cellTemplate;
          cell.innerHTML = (isFunction(ct) ? ct(ctx, cell) : evalTemplate(ct, ctx)) || '';
        }
      }
    };

    /**
     * 이벤트 설정
     *
     * @param {FlexGrid} s
     * @param {GridRestCollectionView} c
     */
    const setDefaultEvents = (s, c) => {
      // 트리 그리드 Collase 셀 설정
      s.formatItem.addHandler(setCollapseCell);
      // 데이터 로드시 페이지 정보 설정
      c.loaded.addHandler(setPage);
    };

    /**
     * 그리드 초기화
     *
     * @param {FlexGrid} s
     */
    const initialize = (s) => {
      // 그리드
      const grid = s;

      state.grid = grid;

      // 컬렉션뷰
      const collection = new TreeGridRestCollectionView({
        grid,
        query: state.query,
        getItems: props.read,
        addItem: props.insert,
        patchItem: props.update,
        deleteItem: props.remove,
        scrollRestoration: true,
      });

      // 아이템 설정
      s.itemsSource = collection;

      // 이벤트 설정
      setDefaultEvents(grid, collection);

      // 트리 그리드 설정
      grid.childItemsPath = props.childItemsPath;
      grid.treeIndent = TREE_INDENT;

      watch(
        () => state.pageSize,
        (pageSize) => (collection.pageSize = pageSize)
      );

      watch(
        () => state.pageNo,
        (pageNo) => collection.moveToPage(pageNo)
      );

      if (isFunction(props.initialized)) {
        props.initialized(asProxyFlexGrid(grid));
      }
    };

    const addNew = () => {
      const grid = state.grid;
      const sourceCollection = grid.sourceCollection;
      const editableCollectionView = grid.editableCollectionView;
      const defaultNewItem = isFunction(editableCollectionView.newItemCreator)
        ? editableCollectionView.newItemCreator()
        : sourceCollection && sourceCollection.length
        ? new sourceCollection[0].constructor()
        : {};
      grid.editor.start(defaultNewItem);
    };

    onMounted(async () => {
      await nextTick();
      const el = header.value;
      const textContent = el.textContent.trim();
      state.isNotBlank = textContent !== '';
    });

    return {
      header,
      initialize,
      addNew,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.h1),
:deep(.h2),
:deep(.h3) {
  position: relative;
  padding-left: 0.75rem;
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: cornflowerblue;
  }
}
</style>
