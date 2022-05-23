<template>
  <wj-flex-grid class="ow-grid" :initialized="initialize" v-bind="$attrs">
    <slot></slot>
  </wj-flex-grid>
</template>

<script>
import {
  //
  isFunction,
  //
  addClass,
  setCss,
  hasClass,
  closest,
  //
  Control,
  Event,
} from '@grapecity/wijmo';
import {
  //
  AllowDragging,
  AllowMerging,
  AllowPinning,
  AllowResizing,
  AllowSorting,
  HeadersVisibility,
  SelectionMode,
  //
  FlexGrid,
  Column,
} from '@grapecity/wijmo.grid';
import {
  //
  WjFlexGrid,
} from '@grapecity/wijmo.vue2.grid';
import {
  //
  watch,
} from 'vue';
import {
  //
  DataTransfer,
} from '@/model';

export const VisibleRowsCount = Symbol('[osstem] visible-rows-count');

export const dataTransfer = new DataTransfer();

export const DraggingColumn = Symbol('[osstem] drag-column');
export const DraggingData = Symbol('[osstem] drag-item');
export const DropHandler = Symbol('[osstem] drop-handler');

if (!FlexGrid.prototype.selectedItem) {
  Object.defineProperty(FlexGrid.prototype, 'selectedItem', {
    get: function () {
      return this.selectedItems.at(0);
    },
    set: function (item) {
      this.deferUpdate(() => {
        for (let i = 0, length = this.rows.length; i < length; i += 1) {
          const row = this.rows.at(i);
          if (row.dataItem === item) {
            return this.select(i, this.selection.col);
          }
        }
      });
    },
  });
}

if (!FlexGrid.prototype.root) {
  Object.defineProperty(FlexGrid.prototype, 'root', {
    get: function () {
      return this._root;
    },
  });
}

/**
 * 그리드의 기본 옵션 설정
 *
 * @param {FlexGrid} s
 */
function setDefaultProperties(s) {
  // 드래그 설정
  s.allowDragging = AllowDragging.None;
  // 병합 설정
  s.allowMerging = AllowMerging.None;
  // 핀 설정
  s.allowPinning = AllowPinning.None;
  // 리사이즈 설정
  s.allowResizing = AllowResizing.None;
  // 정렬 설정
  s.allowSorting = AllowSorting.None;
  // 헤더 설정
  s.headersVisibility = HeadersVisibility.All;
  // 선택 모드 설정
  s.selectionMode = SelectionMode.Row;
  // 헤더 고정 설정
  s.stickyHeaders = true;
  // 마퀴 설정
  s.showMarquee = true;
  // 읽기 전용 설정
  s.isReadOnly = true;
  // 헤더 삭제
  s.rowHeaders.columns.clear();
}

/**
 * 그리드의 옵션 설정
 *
 * @param {FlexGrid} s
 * @param {Object} props
 */
function setCustomProperties(s, props) {
  s[VisibleRowsCount] = props.visibleRowsCount;
  s[DropHandler] = props.drop;
}

/**
 * 그리드의 기본 이벤트 설정
 *
 * @param {FlexGrid} s
 */
function setDefaultEvents(s) {
  // 셀 더블 클릭 필드 생성
  s.doubleClick = new Event();
  // 셀 더블 클릭 핸들러
  s.onDoubleClick = function (e) {
    this.doubleClick.raise(this, e);
  };
  // 셀 더블 클릭 이벤트(cells의 hostElement 이벤트 위임)
  s.addEventListener(s.root, 'dblclick', s.onDoubleClick.bind(s));
}

/**
 * 그리드의 이벤트 설정
 *
 * @param {FlexGrid} s
 */
function setCustomEvents(s) {
  // 높이 조정
  s.loadedRows.addHandler(adjustGridHeight);
  // 드래그 & 드롭 중 드롭에 대한 이벤트
  document.removeEventListener('mouseup', documentMouseup);
  document.addEventListener('mouseup', documentMouseup);
}

/**
 * 그리드의 높이를 조정
 *
 * 헤더의 높이와 보여줄 행의 개수(기본값: 10)만큼 노출합니다.
 * 보여줄 행의 개수보다 존재하는 데이터가 적을 경우 데이터의 양만큼만 보여줍니다.
 *
 * @param {FlexGrid} s
 */
function adjustGridHeight(s) {
  let height = 0;
  const {
    columnHeaders: { rows: rows1 },
    rows: rows2,
  } = s;
  if (rows1.length > 0) {
    // 헤더의 높이
    height += rows1.map((row) => row.renderHeight).reduce((acc, cur) => acc + cur);
  }
  const visibleRowsCount = s[VisibleRowsCount];
  if (rows2.length > visibleRowsCount) {
    // 행의 높이
    height += rows2
      .slice(0, visibleRowsCount)
      .map((row) => row.renderHeight)
      .reduce((acc, cur) => acc + cur);
  } else {
    height += rows2.defaultSize * visibleRowsCount;
  }
  // Magic Number
  height += 2;
  setCss(s.hostElement, { height });
  if (s.rows.length <= visibleRowsCount) {
    setCss(s.root, { overflow: 'hidden' });
  } else {
    setCss(s.root, { 'overflow-x': 'hidden', 'overflow-y': 'auto' });
  }
}

/**
 * 드래그 설정
 *
 * @param {FlexGrid} s
 */
function setDraggable(s) {
  // 헤더 추가
  const column = new Column({
    binding: DraggingColumn.description,
    header: '\u00A0',
    cellTemplate: (ctx) => {
      return ctx.item
        ? '<button class="wj-btn wj-btn-glyph"><span class="wj-glyph-drag" draggable="true"></span></button>'
        : ctx.text;
    },
  });
  s.rowHeaders.columns.push(column);
  // 드래그 & 드롭
  // dragstart => mousedown
  s.addEventListener(s.rowHeaders.hostElement, 'mousedown', (e) => rowHeaderPanelMousedown(e, s));
  s.rowHeaders.hostElement.ondragstart = () => false;
}

/**
 * Row 또는 Cell의 Html Element
 *
 * @param {HTMLElement} elem
 */
function indexByVisibleRows(elem) {
  if (!hasClass(elem, 'wj-row')) {
    elem = closest(elem, '.wj-row');
  }
  let index = -1;
  if (elem) {
    while ((elem = elem.previousSibling)) {
      index += 1;
    }
  }
  return index;
}

/**
 * 드래그 & 드롭의 대상이 되는 엘리먼트 복제
 *
 * @param {HTMLElement} sourceNode
 * @param {Object} css
 */
export function createDraggableCloneNode(sourceNode, css) {
  const cloneNode = sourceNode.cloneNode(true);
  const defaultCss = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    cursor: 'default',
  };
  css = Object.assign({}, defaultCss, css);
  setCss(cloneNode, css);
  // 복제 노드 추가
  document.body.appendChild(cloneNode);
  dataTransfer.stoping.addHandler(() => document.body.removeChild(cloneNode));
  return cloneNode;
}

/**
 * 드래그 헤더의 마우스 다운 이벤트
 * (dragstart)
 *
 *
 * @param {MouseEvent} e
 * @param {FlexGrid} s
 */
function rowHeaderPanelMousedown(e, s) {
  const hit = s.hitTest(e);
  if (hit.row < 0 || hit.col < 0) return;
  // 그리드의 mousedown 이벤트가 발생하지 않도록
  e.preventDefault();
  // 노드 복제
  const index = indexByVisibleRows(e.target);
  const nodes = s.cells.hostElement.querySelectorAll('.wj-row');
  const sourceNode = Array.from(nodes).at(index + 2);
  const dataNode = createDraggableCloneNode(sourceNode, {
    top: e.pageY + 5,
    left: e.pageX + 5,
  });
  // 복제 노드의 하위 노드의 위치 값 초기화
  const childDataNodes = dataNode.querySelectorAll('.wj-cell');
  for (const childDataNode of childDataNodes) {
    setCss(childDataNode, { top: 0 });
  }
  // 복제 노드에 데이터 설정
  const row = s.rows.at(hit.row);
  const item = row.dataItem;
  dataNode[DraggingData] = s.selectedItem = item;
  addClass(dataNode, 'ow-grid');
  // 드래그 이벤트 설정
  dataTransfer.starting.addHandler(() => document.addEventListener('mousemove', documentMousemove));
  dataTransfer.stoping.addHandler(() => document.removeEventListener('mousemove', documentMousemove));
  // 드래그 시작
  dataTransfer.start(s, dataNode);
}

/**
 * 셀 패널의 마우스 오버 이벤트
 *
 * @param {MouseEvent} e
 * @param {FlexGrid} s
 */
function cellPanelMousemove(e, s) {
  const hit = s.hitTest(e);
  if (hit.row < 0 || hit.col < 0) return;
  const row = s.rows.at(hit.row);
  const item = row.dataItem;
  if (item && s.selectedItem !== item) {
    s.selectedItem = item;
  }
}

/**
 * 전역 마우스 오버 이벤트
 * (dragover)
 *
 * @param {MouseEvent} e
 * @param {FlexGrid} s
 */
function documentMousemove(e) {
  if (!dataTransfer.isProcessing) return;
  const dataNode = dataTransfer.data;
  setCss(dataNode, {
    top: e.pageY + 5,
    left: e.pageX + 5,
  });
  const target = document.elementFromPoint(e.pageX, e.pageY);
  if (target) {
    const control = Control.getControl(closest(target, '.wj-control'));
    if (control && control !== dataTransfer.src) {
      cellPanelMousemove(e, control);
    }
  }
}

/**
 * 셀 패널의 마우스 업 이벤트
 * (drop)
 *
 * @param {MouseEvent} e
 * @param {FlexGrid} s
 */
function cellPanelMouseup(e, s) {
  if (!dataTransfer.isProcessing) return;
  const data = dataTransfer.data;
  const drop = s[DropHandler];
  if (!(DraggingData in data)) return;
  const dropData = data[DraggingData];
  if (isFunction(drop)) {
    drop(e, s, dropData);
  } else {
    const { sourceCollection, editableCollectionView } = s;
    const defaultNewItem = isFunction(editableCollectionView.newItemCreator)
      ? editableCollectionView.newItemCreator()
      : sourceCollection && sourceCollection.length
      ? new sourceCollection[0].constructor()
      : {};
    const newItem = Object.assign({}, defaultNewItem, dropData);
    if (s.editor) {
      s.editor.start(newItem);
    } else {
      editableCollectionView.addNew(newItem);
      setTimeout(() => (s.selectedItem = editableCollectionView.items.at(-1)), 100);
    }
  }
}

/**
 * 전역 마우스 업 이벤트
 * (dragend)
 *
 * @param {MouseEvent} e
 */
function documentMouseup(e) {
  if (!dataTransfer.isProcessing) return;
  const target = document.elementFromPoint(e.pageX, e.pageY);
  if (target) {
    const control = Control.getControl(closest(target, '.wj-control'));
    if (control && control !== dataTransfer.src) {
      cellPanelMouseup(e, control);
    }
  }
  dataTransfer.stop();
}

/**
 * 데이터 추가
 */
function addDataItem() {}

/**
 * 데이터 변경
 */
function setDataItem() {}

/**
 * 데이터 삭제
 */
function removeDataItem() {}

export default {
  name: 'OwFlexGrid',
  components: {
    WjFlexGrid,
  },
  inheritAttrs: false,
  props: {
    initialized: Function,
    draggable: Boolean,
    drop: Function,
    visibleRowsCount: { type: Number, default: 10 },
  },
  setup(props) {
    /**
     * 그리드 초기화
     *
     * @param {FlexGrid} s
     */
    const initialize = (s) => {
      // 그리드
      const grid = s;

      // 기본 설정
      setDefaultProperties(grid);

      // 기타 설정
      setCustomProperties(grid, props);

      // 기본 이벤트 정의
      setDefaultEvents(grid);

      // 드래그
      if (props.draggable) {
        setDraggable(grid);
      }

      // 이벤트 정의
      setCustomEvents(grid, props);

      if (isFunction(props.initialized)) {
        props.initialized(grid);
      }

      watch(
        () => props.visibleRowsCount,
        () => grid.onUpdatedView()
      );
    };

    return {
      initialize,
    };
  },
};
</script>

<style lang="scss" scoped>
.ow-grid {
  :deep(.wj-header) {
    text-align: center;
  }
  :deep([wj-part='root']) {
    overflow: hidden overlay !important;
  }
  :deep(.wj-cell) {
    label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
