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
    :lazy-render="false"
  >
    <slot></slot>
  </wj-flex-grid>
</template>
<script>
import { addClass, createElement, Event, hasClass, setChecked, Tooltip, Key, ObservableArray } from '@grapecity/wijmo';
import {
  AllowDragging,
  AllowMerging,
  AllowPinning,
  AllowResizing,
  AllowSorting,
  CellType,
  CellEditEndingEventArgs,
  CellFactory,
  CellRange,
  Column,
  FormatItemEventArgs,
  HeadersVisibility,
  Row,
  SelectionMode,
  SelMove,
} from '@grapecity/wijmo.grid';
import { Selector } from '@grapecity/wijmo.grid.selector';
import { nextTick } from '@vue/runtime-core';

const _CLS_CB_ITEM = 'wj-column-selector';
const _CLS_CB_GROUP = 'wj-column-selector-group';

class OwSelector extends Selector {
  constructor(...args) {
    super(...args);
    this._checkedItems = new ObservableArray();
    this.formatItem = new Event();
  }

  get checkedItems() {
    return this._checkedItems;
  }

  onFormatItem(e) {
    this.formatItem.raise(this, e);
  }

  _initialize() {
    this.itemChecked.addHandler(() => {
      this.checkedItems.clear();
      this.checkedItems.push(...this._grid.rows.filter((row) => row.isSelected));
    });
  }

  // [ISSUE | 2022.02.25] 셀렉터의 비활성화 추가(압축된 코드 재사용)
  _getRowChecked(e, t) {
    if (typeof t === 'undefined') {
      t = e;
    }
    let o = 0;
    let i = 0;
    let n = this._col._binding;
    for (let s = e; s <= t && (!o || !i); s += 1) {
      const l = this._grid.rows[s];
      const r = l.dataItem;
      if (r && !this._isGroupRow(l)) {
        if (!l.isSelectorDisabled) {
          if (this._isBound ? n.getValue(r) : l.isSelected) {
            o += 1;
          } else {
            i += 1;
          }
        }
      }
    }
    return !(!o || i) || (!(i && !o) && null);
  }

  _setRangeChecked(e, t) {
    var o = this,
      i = this._grid,
      n = i.rows,
      s = this._col,
      l = s ? s._binding : null,
      r = i.selection,
      c = this._isBound ? i.editableCollectionView : null;
    if (!this._isBound || (!i.isReadOnly && c && l)) {
      var a = !1;
      if (c) {
        var h = !0;
        c instanceof CollectionView && !c.refreshOnEdit && (h = !1);
        if (h) {
          a = !0;
          c.beginUpdate();
        }
      }
      i.deferUpdate(function () {
        for (var r = t.bottomRow; r >= t.topRow; r--) {
          var a = n[r],
            h = a.dataItem;
          if (h)
            if (o._isGroupRow(a)) i.childItemsPath && !o._isBound && (a.isSelected = e);
            else if (o._isBound) {
              if (h[s.binding] != e) {
                c && c.editItem(h);
                var d = new CellRange(r, s.index),
                  u = new CellEditEndingEventArgs(i.cells, d, h[s.binding]);
                if (i.onCellEditEnding(u)) {
                  l.setValue(h, e);
                  i.onCellEditEnded(u);
                }
              }
            } else {
              if (!a.isSelectorDisabled) {
                a.isSelected = e;
              }
            }
        }
      });
      if (c) {
        c.commitEdit();
        a && c.endUpdate();
        i.selection = r;
      }
    }
  }

  // [ISSUE | 2022.02.25] 셀렉터의 비활성화 추가(압축된 코드 재사용)
  _formatItem(e, t) {
    const o = t.getColumn();
    const i = e.editRange;
    if (o && o == this._col && (!i || !i.contains(t.row, t.col)) && t.panel.rows != e.columnFooters.rows) {
      const n = t.getRow();
      const s = t.cell;
      let l;
      let r;
      if (t.panel.rows == e.columnHeaders.rows) {
        if (this._showCheckAll && t.range.bottomRow == t.panel.rows.length - 1) {
          r = this._getRowChecked(0, e.rows.length - 1);
          l = _CLS_CB_ITEM + ' ' + _CLS_CB_GROUP;
        }
      } else if (this._isGroupRow(n)) {
        const c = n.getCellRange();
        r = this._getRowChecked(c.row, c.row2);
        l = _CLS_CB_ITEM + ' ' + _CLS_CB_GROUP;
      } else if (n.dataItem && !this._isBound) {
        r = this._getRowChecked(t.row);
        l = _CLS_CB_ITEM;
      }
      if (l) {
        if (
          this._isFixedCol ||
          (this._isBound && this._isGroupRow(n) && o.aggregate && o.index > e.columns.firstVisibleIndex)
        ) {
          const a = s.querySelector('.' + CellFactory._WJC_COLLAPSE);
          s.textContent = '';
          a && s.appendChild(a);
        }
        const h = createElement('<label><input type="checkbox" class="' + l + '" tabindex="-1"><span></span></label>');
        const d = h.querySelector('input');
        setChecked(d, r);
        if (this._isBound && (o.isReadOnly || e.selectionMode == SelectionMode.None)) {
          d.disabled = !0;
          d.style.cursor = 'default';
        } else if (n.isSelectorDisabled) {
          setChecked(d, false);
          d.disabled = !0;
          d.style.cursor = 'default';
        }
        s.insertBefore(h, s.firstChild);
      }
    }
  }

  // 셀렉터 비활성화 설정
  disabled(row) {
    if (row instanceof Row) {
      row.isSelectorDisabled = true;
      this._grid.invalidate();
    }
  }

  // 셀렉터 체크
  checked(row, force) {
    if (row instanceof Row) {
      if (typeof force === 'undefined') {
        row.isSelected = !row.isSelected;
      } else {
        row.isSelected = force;
      }
      this._grid.invalidate();
    }
  }
}

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
    lazyRender: Boolean,
  },
  setup(props) {
    const init = (s) => {
      // [ISSUE | 2022.02.22] 데이터 바인딩 이후 폭이 변경됨, 바인딩 되기 전의 폭으로 강제 변경 이후에 다시 100%
      const width = getComputedStyle(s.hostElement).getPropertyValue('width');
      nextTick(() => (s.hostElement.style.width = width)).then(() => (s.hostElement.style.width = '100%'));

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
  border: 1px solid rgba(215, 220, 227, 1);
  :deep(.wj-header) {
    text-align: center;
  }
}
</style>
