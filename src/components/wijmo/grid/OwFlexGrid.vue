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
import { hasClass, Tooltip, Key, setChecked } from '@grapecity/wijmo';
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

import { OwSelector } from '@/utils/wijmo.grid';

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
    allowCheckbox: { type: Boolean, default: true },
    headersVisibility: { type: [Number, String], default: HeadersVisibility.All },
    selectionMode: { type: [Number, String], default: SelectionMode.Row },
    showMarquee: { type: Boolean, default: true },
    stickyHeaders: { type: Boolean, default: true },
    newRowAtTop: { type: Boolean, default: true },
  },
  setup(props) {
    let s;
    const init = (...args) => {
      s = args.at(0);

      // [ISSUE | 2022.03.04] 100%를 넘는 너비로 인해 상위 엘리먼트의 너비를 기준으로 resize 이벤트 발생시 변경
      const resize = () => {
        if (s.hostElement.parentElement) {
          const parentStyle = getComputedStyle(s.hostElement.parentElement);
          const width = parentStyle.getPropertyValue('width');
          s.hostElement.style.width = width;
        }
      };
      window.addEventListener('resize', resize);
      resize();

      // AllowDragging
      const draggableHeader = new Column({
        binding: 'drag',
        header: '\u00A0',
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

      s.formatItem.addHandler((s, e) => {
        // Tooltip
        if (props.allowTooltip && CellType.Cell === e.panel.cellType) {
          e.cell.setAttribute('title', _.trim(e.cell.textContent));
        }
      });

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

      // Selector
      const setSelector = () => {
        const selectorHeader = new Column({ binding: Symbol('Selector').toString() });
        s.rowHeaders.columns.shift();
        s.rowHeaders.columns.splice(0, 0, selectorHeader);

        s.selector = new OwSelector(selectorHeader);

        // [ISSUE | 2022.02.25] FlexGrid의 FormatItem에 등록하는 경우 Rendering이 수행된 지점만 formatItem이 호출됨
        // => formatItem의 addHandler 대신 loadedRows의 addHandler를 사용함
        s.loadedRows.addHandler(s.selector.onFormatItem, s.selector);

        // [ISSUE | 2022.02.17] RowRange, ListBox, MultiRange인 경우 정상적으로 동작하지 않음
        s.selectionMode = props.selectionMode > SelectionMode.Row ? SelectionMode.Row : props.selectionMode;
      };

      if (props.allowSelector) {
        setSelector();
      } else {
        if (s.rowHeaders?.columns.length > 0) {
          s.rowHeaders.columns.shift();
        }
      }

      const setCheckbox = () => {
        s.columns.forEach(col => {
          if (col.cssClass === 'checkbox') {
            col.isReadOnly = true;
            col.cellTemplate = '<label><input type="checkbox" /><span></span></label>';
          }
        });

        s.formatItem.addHandler((s, e) => {
          let row = e.panel.rows[e.row],
              col = e.panel.columns[e.col];
          
          if (e.panel.cellType === CellType.Cell && col.cssClass === 'checkbox') {
            let input = e.cell.querySelector("input"),
                check = row.dataItem[col.binding] === 'Y' ? true : false,
                value = check ? 'N' : 'Y';

            setChecked(input, check);

            input.addEventListener("click", 
              () => {
                s.setCellData(s.selection.row, col.binding, value);
              }
            );
          }
        })
      }

      if (props.allowCheckbox) {
        setCheckbox();
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
      &.wj-state-active {
        background-color: rgba(180, 220, 255, 1);
      }
      // &[aria-readonly='true'] {
      //   color: rgba(150, 150, 150, 1) !important;
      // }
      &[aria-readonly='true']:hover {
        &::before {
          content: '\1f512\fe0e';
          position: absolute;
          right: 2px;
        }
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
