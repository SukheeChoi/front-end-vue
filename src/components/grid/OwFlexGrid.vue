<template>
  <wj-flex-grid
    class="ow-grid"
    :initialized="init"
    :allow-dragging="allowDragging"
    :allow-merging="allowMerging"
    :allow-pinning="allowPinning"
    :allow-resizing="allowResizing"
    :allow-sorting="allowSorting"
    :headers-visibility="headersVisibility"
    :selection-mode="selectionMode"
    :show-marquee="showMarquee"
    :sticky-headers="stickyHeaders"
    :new-row-at-top="newRowAtTop"
  >
    <slot></slot>
  </wj-flex-grid>
</template>
<script>
import { addClass, hasClass, toggleClass, createElement, CollectionView, Key, setChecked } from '@grapecity/wijmo';
import {
  AllowDragging,
  AllowMerging,
  AllowPinning,
  AllowResizing,
  AllowSorting,
  CellType,
  CellRange,
  CellEditEndingEventArgs,
  Column,
  HeadersVisibility,
  SelectionMode,
  SelMove,
} from '@grapecity/wijmo.grid';

import { RestCollectionView } from '@grapecity/wijmo.rest';

import { OwSelector } from '@/utils/wijmo.grid';

const BINDING_SYMBOL_SELECTOR = Symbol('Selector');

export default {
  name: 'OwFlexGrid',
  props: {
    initialized: Function,
    allowDragging: { type: [Number, String], default: AllowDragging.None },
    allowMerging: { type: [Number, String], default: AllowMerging.None },
    allowPinning: { type: [Number, String], default: AllowPinning.None },
    allowResizing: { type: [Number, String], default: AllowResizing.None },
    allowSorting: { type: [Number, String], default: AllowSorting.None },
    allowSelector: { type: Boolean, default: false },
    allowTooltip: { type: Boolean, default: true },
    allowCheckbox: { type: Boolean, default: true },
    headersVisibility: { type: [Number, String], default: HeadersVisibility.All },
    selectionMode: { type: [Number, String], default: SelectionMode.Row },
    showMarquee: { type: Boolean, default: true },
    stickyHeaders: { type: Boolean, default: true },
    newRowAtTop: { type: Boolean, default: true },
  },
  setup(props) {
    const init = (s) => {
      // 비어있는 컬렉션 생성
      s.itemsSource = new CollectionView();

      // 모든 RowHeaders 제거
      s.rowHeaders.columns.clear();

      // 드래그 헤더 생성
      if (AllowDragging.Rows <= AllowDragging[props.allowDragging]) {
        const draggableHeader = new Column({
          binding: 'drag',
          header: '\u00A0',
          cellTemplate: (ctx) => {
            if (ctx.item) {
              return `
                <button class="wj-btn wj-btn-glyph">
                  <span class="wj-glyph-drag"></span>
                </button>
              `;
            }
            return ctx.text;
          },
        });
        s.rowHeaders.columns.push(draggableHeader);
      }

      // 셀렉터 헤더 생성
      if (props.allowSelector) {
        const selectableHeader = new Column({
          binding: 'selector',
          header: '\u00A0',
        });
        s.rowHeaders.columns.push(selectableHeader);

        s.selector = new OwSelector(selectableHeader);

        // [ISSUE | 2022.02.25] FlexGrid의 FormatItem에 등록하는 경우 Rendering이 수행된 지점만 formatItem이 호출됨
        // => formatItem의 addHandler 대신 loadedRows의 addHandler를 사용함
        s.loadedRows.addHandler(s.selector.onFormatItem, s.selector);
        // [ISSUE | 2022.02.17] RowRange, ListBox, MultiRange인 경우 정상적으로 동작하지 않음
        s.selectionMode = props.selectionMode > SelectionMode.Row ? SelectionMode.Row : props.selectionMode;
      }

      // 셀이 변경되면 즉시 반영한다.
      s.cellEditEnded.addHandler((s, e) => {
        const ecv = s.editableCollectionView;
        if (ecv) {
          const editHandler = s._edtHdl;
          editHandler._commitRowEdits();
        }
      });

      s.formatItem.addHandler((s, e) => {
        if (CellType.Cell === e.panel.cellType) {
          const row = e.getRow();
          const col = e.getColumn();
          const item = row.dataItem;
          const binding = col._binding;
          const value = binding.getValue(item);
          // 필수 열 체크
          if (!col.isReadOnly && col.isRequired && _.isEmpty(value)) {
            addClass(e.cell, 'ow-grid-required');
          }
          if (!s.isReadOnly) {
            toggleClass(e.cell, 'wj-state-readonly', !s.canEditCell(row.index, col.index));
          }
        }
      });

      // [ISSUE | 2022.03.04] 100%를 넘는 너비로 인해 상위 엘리먼트의 너비를 기준으로 resize 이벤트 발생시 변경
      const resize = () => {
        if (s.hostElement?.parentElement) {
          const parentStyle = getComputedStyle(s.hostElement.parentElement);
          const width = parentStyle.getPropertyValue('width');
          s.hostElement.style.setProperty('width', width);
        }
      };
      window.addEventListener('resize', resize);
      resize();

      // RowRange, ListBox, MultiRange
      const selectionModeHandler = (e) => {
        const hit = s.hitTest(e);
        if (hit.cellType === CellType.Cell && s.selectionMode > SelectionMode.Row) {
          const range = hit.range.clone();
          const cell = s.cells.getCellElement(hit.row, hit.col);
          for (let i = range.row; cell === s.cells.getCellElement(i, range.col); i -= 1) {
            range.row = i;
          }
          for (let i = range.row2; cell === s.cells.getCellElement(i, range.col); i += 1) {
            range.row2 = i;
          }
          s.selection = range;
          e.preventDefault();
        }
      };

      s.addEventListener(s.hostElement, 'mousedown', selectionModeHandler);
      s.addEventListener(s.hostElement, 'mouseup', selectionModeHandler);

      // 툴팁
      if (props.allowTooltip) {
        s.formatItem.addHandler((s, e) => {
          if (CellType.Cell === e.panel.cellType) {
            e.cell.setAttribute('title', _.trim(e.cell.textContent));
          }
        });
      }

      // [ISSUE | 2022.02.17] 병합된 셀이 있는 경우 순회를 제대로 하지 못함.
      // Tab Index
      const findIndexByTab = (e) => {
        if (!(e instanceof MouseEvent || e instanceof KeyboardEvent)) {
          throw 'Mouse Event 또는 Keyboard Event가 필요합니다.';
        }
        for (let i = 0; i < s.rows.length; i += 1) {
          for (let j = 0; j < s.columns.length; j += 1) {
            if (e.target === s.cells.getCellElement(i, j)) {
              return {
                row: i,
                col: j,
              };
            }
          }
        }
        return {
          row: -1,
          col: -1,
        };
      };

      const tabIndexHandler = (e) => {
        const { keyCode, shiftKey, target } = e;
        if (keyCode === Key.Tab && hasClass(target, 'wj-cell')) {
          const { row, col } = findIndexByTab(e);
          const dir = shiftKey ? SelMove.PrevEditableCell : SelMove.NextEditableCell;
          let r = row;
          let c = s.columns.getNextCell(col, dir);
          if (c === col) {
            switch (dir) {
              case SelMove.PrevEditableCell:
                r -= 1;
                c = s.columns.getNextCell(s.columns.length, dir);
                break;
              case SelMove.NextEditableCell:
                r += 1;
                c = s.columns.getNextCell(-1, dir);
                break;
            }
          }
          if (r < 0 || r === s.rows.length) {
            r = row;
            c = col;
          }
          s.finishEditing();
          s.startEditing(false, Math.abs(r), Math.abs(c));
        }
      };

      s.addEventListener(s.hostElement, 'keyup', tabIndexHandler);

      const setCheckbox = () => {
        const formatItem = (s, e) => {
          const row = e.getRow();
          const column = e.getColumn();
          const dataItem = row.dataItem;
          const cell = e.cell;
          const cellType = e.panel.cellType;
          if (CellType.Cell === cellType) {
            const cssClass = column.cssClass;
            if (cssClass && cssClass.includes('checkbox')) {
              cell.textContent = '';
              const element = createElement(`
                <label>
                  <input type="checkbox" class="wj-cell-check" />
                  <span class="ow-cell-check"></span>
                </label>
              `);
              const input = element.querySelector('input');
              const value = column._binding.getValue(dataItem);
              setChecked(input, value === 'Y');
              if (column.isReadOnly) {
                input.disabled = true;
                input.style.cursor = 'default';
              }
              cell.insertBefore(element, cell.firstChild);
            }
          }
        };
        const click = function (e) {
          if (e.target instanceof HTMLElement && hasClass(e.target, 'ow-cell-check')) {
            const target = e.target.previousElementSibling;
            const hit = s.hitTest(e);
            const row = hit.getRow();
            const column = hit.getColumn();
            if (!column.isReadOnly && hasClass(target, 'wj-cell-check')) {
              const collectionView = s.editableCollectionView;
              let isUpdate = false;
              let isEdit = collectionView instanceof CollectionView && collectionView.refreshOnEdit;
              if (isEdit) {
                isUpdate = true;
                collectionView.beginUpdate();
              }
              s.deferUpdate(function () {
                const dataItem = row.dataItem;
                if (dataItem) {
                  const checked = (target.checked = !target.checked) ? 'Y' : 'N';
                  if (dataItem[column.binding] !== checked) {
                    collectionView.editItem(dataItem);
                    const range = new CellRange(row.index, column.index);
                    const event = new CellEditEndingEventArgs(s.cells, range, dataItem[column.binding]);
                    if (s.onCellEditEnding(event)) {
                      column._binding.setValue(dataItem, checked);
                      s.onCellEditEnded(event);
                    }
                  }
                }
              });
              collectionView.commitEdit();
              if (isUpdate) {
                collectionView.endUpdate();
              }
              e.preventDefault();
            }
          }
        };
        s.formatItem.removeHandler(formatItem);
        s.removeEventListener(s.hostElement, 'click', click);
        s.formatItem.addHandler(formatItem);
        s.addEventListener(s.hostElement, 'click', click);
      };

      if (props.allowCheckbox) {
        setCheckbox();
      }

      // 0.1 초 후에 모든 셀 리프레시
      setTimeout(() => s.refreshCells(false, true, true), 100);

      if (props.initialized) {
        props.initialized(s);
      }
    };
    return {
      init,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-grid {
  :deep(.wj-header) {
    text-align: center;
  }
  :deep(.wj-marquee) {
    box-shadow: none;
  }
  :deep(.wj-cells) {
    .wj-cell {
      min-height: 35px;
      &.wj-state-active {
        background-color: rgba(180, 220, 255, 1);
      }
      &.wj-state-readonly {
        &:hover {
          &::before {
            content: '\1f512\fe0e';
            position: absolute;
            right: 11px;
          }
        }
        // DataMap의 우측 화살표 제거
        .wj-btn.wj-btn-glyph.wj-right.wj-elem-dropdown {
          display: none;
        }
      }
      label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  :deep(.wj-cells),
  :deep(.wj-colheaders) {
    & .wj-cell:last-child {
      border-right: 0;
    }
  }
  :depp(.wj-topleft),
  :deep(.wj-rowheaders) {
    & .wj-cell:first-child {
      border-left: 0;
    }
  }
}
</style>
