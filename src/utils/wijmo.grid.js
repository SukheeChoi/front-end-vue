import { NotifyCollectionChangedAction, Tooltip, PopupPosition, CellRangeEventArgs } from '@grapecity/wijmo';
import { MergeManager, CellRange, CellType } from '@grapecity/wijmo.grid';

class SimpleMergeManager extends MergeManager {
  constructor(config) {
    super();
    this.groupingColumns = config.groupingColumns || [];
    this.mergedColumns = config.mergedColumns || [];
    if (typeof config.isMergedEmpty === 'undefined') {
      config.isMergedEmpty = true;
    }
    this.isMergedEmpty = !!config.isMergedEmpty;
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
    const data1 = panel.getCellData(row_prev, col_prev, false);
    const data2 = panel.getCellData(row_next, col_next, false);

    return (this.isMergedEmpty && (data1 === '' || data2 === '')) || data1 === data2;
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

  #formatItem() {
    this.flex.formatItem.addHandler((s, e) => {
      const { cell, panel, row: r, col: c } = e;
      if (panel.cellType === CellType.Cell) {
        if (s.rows && s.rows.length > 0) {
          const row = s.rows.at(r);
          if (row && row.dataItem && row.dataItem.rowStatus === 'C') {
            const col = s.columns.at(c);
            const data = panel.getCellData(r, c);
            if (col && col.validator && !data) {
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
      const column = e.getColumn();
      const { ok, message = '' } =
        (await column.validator(s.activeEditor.value, s, e)) ||
        (() => {
          return { ok: true };
        });
      const cell = s.cells.getCellElement(r, c);
      if ((e.cancel = e.stayInEditMode = !ok)) {
        s.startEditing(false, r, c);
        s._edtHdl._setCellError(cell, message);
      }
      if (cell.textContent) {
        cell.classList.remove('wj-flexgrid-required');
      } else {
        cell.classList.add('wj-flexgrid-required');
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

class TooltipManager {
  #tooltip = new Tooltip({
    position: PopupPosition.RightBottom,
    gap: 10,
    showAtMouse: true,
    showDelay: 500,
  });

  constructor(flex) {
    this.flex = flex;
    this.#init();
  }

  #init() {
    this.flex.formatItem.addHandler((s, e) => {
      const { cell } = e;
      this.#tooltip.setTooltip(cell, cell.textContent);
    });
  }

  /**
   * @param {PopupPosition} position
   */
  set position(position) {
    this.#tooltip.position = position;
  }

  /**
   * @param {number} delay
   */
  set delay(delay) {
    this.#tooltip.showDelay = delay;
  }
}

export { TooltipManager };

function contour(flex, cssClassAll, begin = '__begin', end = '__end') {
  let before_cell;
  flex.formatItem.addHandler((s, { panel: { cellType }, cell }) => {
    if (cell.classList.contains(cssClassAll)) {
      if (CellType.ColumnHeader === cellType) {
        cell.classList.replace(cssClassAll, `${cssClassAll}${begin}`);
      } else if (CellType.Cell === cellType) {
        if (before_cell) {
          before_cell.classList.replace(`${cssClassAll}${end}`, cssClassAll);
        }
        cell.classList.replace(cssClassAll, `${cssClassAll}${end}`);
        before_cell = cell;
      }
    }
  });
}

export { contour };
