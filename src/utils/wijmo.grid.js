import _ from 'lodash';
import { createElement, setChecked, Event, ObservableArray } from '@grapecity/wijmo';
import { MergeManager, CellRange, CellType, CellEditEndingEventArgs, CellFactory, Row } from '@grapecity/wijmo.grid';
import { Selector } from '@grapecity/wijmo.grid.selector';

class SimpleMergeManager extends MergeManager {
  constructor(config) {
    super();
    this.groupingColumns = config.groupingColumns || [];
    this.mergedColumns = config.mergedColumns || [];
  }

  isMerged(p, c) {
    if (this.mergedColumns.length === 0) {
      return true;
    }
    for (const column of this.mergedColumns) {
      const i = this.getColumnIndex(p, column);
      if (i === c) {
        return true;
      }
    }
    return false;
  }

  getColumnIndex(p, c) {
    const column = p.columns.getColumn(c);
    if (column && typeof column.index !== 'undefined') {
      return column.index;
    }
    return -1;
  }

  equals(panel, row, col, type) {
    let row_prev = row,
      row_next = row,
      col_prev = col,
      col_next = col;
    switch (type) {
      case 'row_prev':
        row_prev -= 1;
        break;
      case 'row_next':
        row_next += 1;
        break;
      case 'col_prev':
        col_prev -= 1;
        break;
      case 'col_next':
        col_next += 1;
        break;
    }
    const data1 = panel.getCellData(row_prev, col_prev, false) || '';
    const data2 = panel.getCellData(row_next, col_next, false) || '';
    return data1 !== '' && data2 !== '' && data1 === data2;
  }

  colMergedRange(p, r) {
    for (let i = r.col; i > 0; i -= 1) {
      if (this.equals(p, r.row, i, 'col_prev')) {
        r.col = i - 1;
      } else {
        break;
      }
    }
    for (let i = r.col, l = p.columns.length - 1; i < l; i += 1) {
      if (this.equals(p, r.row, i, 'col_next')) {
        r.col2 = i + 1;
      } else {
        break;
      }
    }
  }

  rowMergedRange(p, r) {
    for (let i = r.row; i > 0; i -= 1) {
      let isGroup = true;
      for (const column of this.groupingColumns) {
        const ci = this.getColumnIndex(p, column);
        if (!(isGroup = this.equals(p, i, ci, 'row_prev'))) {
          break;
        }
      }
      if (isGroup && this.equals(p, i, r.col, 'row_prev')) {
        r.row = i - 1;
      } else {
        break;
      }
    }
    for (let i = r.row, l = p.rows.length - 1; i < l; i += 1) {
      let isGroup = true;
      for (const column of this.groupingColumns) {
        const ci = this.getColumnIndex(p, column);
        if (!(isGroup = this.equals(p, i, ci, 'row_next'))) {
          break;
        }
      }
      if (isGroup && this.equals(p, i, r.col, 'row_next')) {
        r.row2 = i + 1;
      } else {
        break;
      }
    }
  }

  getMergedRange(p, r, c) {
    const range = new CellRange(r, c);
    switch (p.cellType) {
      case CellType.ColumnHeader:
        this.colMergedRange(p, range);
        break;
      case CellType.Cell:
        if (this.isMerged(p, c)) {
          this.rowMergedRange(p, range);
        }
        break;
    }
    return range;
  }
}

export { SimpleMergeManager };

class ValidatorManager {
  constructor(flex, validator = {}) {
    this.flex = flex;
    this.validator = validator;
    this.#init();
  }

  static noop = () => ({ ok: true });

  #formatItem() {
    this.flex.formatItem.addHandler((s, e) => {
      const { cell, panel, row: r, col: c } = e;
      if (panel.cellType === CellType.Cell) {
        if (s.rows && s.rows.length > 0) {
          const row = s.rows.at(r);
          if (row && row.dataItem && row.dataItem.rowStatus === 'C') {
            const col = s.columns.at(c);
            const data = panel.getCellData(r, c);
            if (col && col.isRequired && !data) {
              cell.classList.add('wj-flexgrid-required');
            }
          }
        }
      }
    });
  }

  #cellEditEnding() {
    this.flex.cellEditEnding.addHandler(async (s, e) => {
      const { row: r, col: c } = e;
      const row = e.getRow();
      const column = e.getColumn();
      const binding = column.binding;
      const cv = s.collectionView;

      const orgValues = cv._orgValues;
      const orgIndex = row.index - cv.itemsAdded.length;
      const oldVal = (orgValues && orgValues[orgIndex] && orgValues[orgIndex][binding]) || row.dataItem[binding];
      const newVal = s.activeEditor.value;

      if (oldVal !== newVal) {
        const element = s.cells.getCellElement(r, c);
        if (element) {
          element.classList.toggle('wj-flexgrid-required', !!newVal);
        }
        const validator = column.validator || ValidatorManager.noop;
        const { ok, message = '' } = await validator(newVal, s, e);
        if ((e.cancel = e.stayInEditMode = !ok)) {
          s.startEditing(true, r, c);
          s._edtHdl._setCellError(element, message);
          row.dataItem[column.binding] = oldVal;
        }
      }
    });
  }

  #init() {
    for (const column of this.flex.columns) {
      column.validator = this.validator[column.binding];
    }
    this.#cellEditEnding();
    this.#formatItem();
  }
}

export { ValidatorManager };

function contour(flex, cssClass) {
  flex.formatItem.addHandler((s, e) => {
    const { cell } = e;
    if (cell.classList.contains(cssClass)) {
      const { panel, row } = e;

      if (panel.cellType === CellType.ColumnHeader) {
        cell.classList.add(cssClass + '-t');
      } else if (panel.cellType === CellType.Cell) {
        if (row === panel.rows.length - 1) {
          cell.classList.add(cssClass + '-b');
        }
      }

      cell.classList.add(cssClass + '-l', cssClass + '-r');

      // prev
      const prev = cell.previousElementSibling;
      if (prev && prev.classList.contains(cssClass)) {
        cell.classList.remove(cssClass + '-l');
        prev.classList.remove(cssClass + '-r');
      }
    }
  });
}

export { contour };

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
    if (o && o === this._col && t.panel.rows !== e.columnFooters.rows) {
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
    }
    this.onItemChecked();
    this._grid.invalidate();
  }

  // 셀렉터 체크
  checked(row, force) {
    if (row instanceof Row) {
      if (typeof force === 'undefined') {
        row.isSelected = !row.isSelected;
      } else {
        row.isSelected = force;
      }
    }
    this.onItemChecked();
    this._grid.invalidate();
  }
}

export { OwSelector };
