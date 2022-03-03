import _ from 'lodash';
import { Tooltip, PopupPosition, Key, hasClass } from '@grapecity/wijmo';
import { MergeManager, CellRange, CellType, SelMove } from '@grapecity/wijmo.grid';

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

function tooltip(flex, options) {
  const tip = new Tooltip(
    _.assign(
      {
        position: PopupPosition.RightBottom,
        gap: 10,
        showAtMouse: true,
        showDelay: 500,
      },
      options
    )
  );
  flex.formatItem.addHandler((s, e) => {
    tip.setTooltip(e.cell, e.cell.textContent);
  });
}

export { tooltip };

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

function findByEvent(flex, e) {
  if (!(e instanceof MouseEvent || e instanceof KeyboardEvent)) {
    throw 'Mouse Event 또는 Keyboard Event가 필요합니다.';
  }
  for (let i = 0; i < flex.rows.length; i += 1) {
    for (let j = 0; j < flex.columns.length; j += 1) {
      if (e.target === flex.cells.getCellElement(i, j)) {
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
}

function tabindex(flex) {
  flex.addEventListener(flex.hostElement, 'keyup', (e) => {
    if (Key.Tab === e.keyCode && hasClass(e.target, 'wj-cell')) {
      const { rows, columns } = flex;
      const { row, col } = findByEvent(flex, e);

      const dir = e.shiftKey ? SelMove.PrevEditableCell : SelMove.NextEditableCell;

      let r = row;
      let c = columns.getNextCell(col, dir);

      if (c === col) {
        switch (dir) {
          case SelMove.PrevEditableCell:
            r -= 1;
            c = columns.getNextCell(columns.length, dir);
            break;
          case SelMove.NextEditableCell:
            r += 1;
            c = columns.getNextCell(-1, dir);
        }
      }

      if (r < 0 || r === rows.length) {
        r = row;
        c = col;
      }

      flex.finishEditing();
      flex.startEditing(false, r, c);
    }
  });
}

export { tabindex };
