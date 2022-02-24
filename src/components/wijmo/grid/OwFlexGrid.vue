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
    :sticky-headers="stickyHeaders"
    :new-row-at-top="newRowAtTop"
  >
    <slot></slot>
  </wj-flex-grid>
</template>
<script>
import { hasClass, Control, Tooltip, Key, ObservableArray } from '@grapecity/wijmo';
import {
  AllowDragging,
  AllowMerging,
  AllowPinning,
  AllowResizing,
  AllowSorting,
  CellType,
  Column,
  HeadersVisibility,
  SelectionMode,
  SelMove,
} from '@grapecity/wijmo.grid';
import { Selector } from '@grapecity/wijmo.grid.selector';
import { nextTick, onMounted } from '@vue/runtime-core';

export default {
  name: 'OwFlexGrid',
  props: {
    initialized: Function,
    allowDragging: { type: [Number, String], default: AllowDragging.None },
    allowMerging: { type: [Number, String], default: AllowMerging.None },
    allowPinning: { type: [Number, String], default: AllowPinning.None },
    allowResizing: { type: [Number, String], default: AllowResizing.None },
    allowSorting: { type: [Number, String], default: AllowSorting.None },
    allowSelector: Boolean,
    allowTooltip: { type: Boolean, default: true },
    headersVisibility: { type: [Number, String], default: HeadersVisibility.All },
    selectionMode: { type: [Number, String], default: SelectionMode.Row },
    stickyHeaders: { type: Boolean, default: true },
    newRowAtTop: { type: Boolean, default: true },
  },
  setup(props) {
    const init = (s) => {
      const width = getComputedStyle(s.hostElement).getPropertyValue('width');
      // [ISSUE | 2022.02.22] 데이터 바인딩 이후 폭이 변경됨, 바인딩 되기 전의 폭으로 강제 변경
      nextTick(() => (s.hostElement.style.width = width));

      // AllowDragging
      const draggableHeader = new Column({
        cellTemplate: (ctx) => {
          if (ctx.item) {
            return '<button class="wj-btn wj-btn-glyph"><span class="wj-glyph-drag"></span></button>';
          }
          return ctx.text;
        },
        visible: AllowDragging.Rows <= AllowDragging[props.allowDragging],
      });

      s.rowHeaders.columns.push(draggableHeader);

      // RowRange, ListBox, MultiRange
      const setSelection = (e) => {
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

      s.addEventListener(s.hostElement, 'mousedown', setSelection);
      s.addEventListener(s.hostElement, 'mouseup', setSelection);

      // Tooltip
      if (props.allowTooltip) {
        // Cell에 대해서
        s.formatItem.addHandler((s, { cell }) => {
          const tt = new Tooltip();
          const debounce = _.debounce(() => {
            const content = _.trim(cell.textContent);
            if (content && hasClass(cell, 'wj-cell') && !hasClass(cell, 'wj-state-invalid')) {
              tt.show(cell, content);
            }
          }, 300);
          const clear = () => {
            tt.hide();
            debounce.cancel();
          };
          cell.addEventListener('mouseenter', debounce);
          cell.addEventListener('mouseleave', clear);
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

      const setTabIndex = (e) => {
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
          s.startEditing(false, r, c);
        }
      };

      s.addEventListener(s.hostElement, 'keyup', setTabIndex);

      // [ISSUE | 2022.02.17] RowRange, ListBox, MultiRange인 경우 정상적으로 동작하지 않음
      // Selector
      const setSelector = () => {
        const selector = new Selector(s, {
          itemChecked: () => {
            s.selector.checkedItems.clear();
            s.selector.checkedItems.push(...s.rows.filter((row) => row.isSelected));
          },
        });
        s.selector = selector;
        s.selector.checkedItems = new ObservableArray();

        // [ISSUE | 2022.02.17] RowRange, ListBox, MultiRange인 경우 정상적으로 동작하지 않음
        s.selectionMode = props.selectionMode > SelectionMode.Row ? SelectionMode.Row : props.selectionMode;
      };

      if (props.allowSelector) {
        setSelector();
      } else {
        s.rowHeaders.columns.shift();
      }

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
