import { MergeManager, CellRange, CellType } from '@grapecity/wijmo.grid';

function equals(a, b) {
  return b === '' || a === b;
}

function isCell({ cellType }) {
  return CellType.Cell === cellType;
}

class SimpleMergeManager extends MergeManager {
  constructor(...indexes) {
    super();
    this.indexes = indexes;
  }

  #cellMergedRange(panel, range) {
    for (let index = range.row, length = panel.rows.length - 1; index < length; index += 1) {
      if (!equals(panel.getCellData(index, range.col, true), panel.getCellData(index + 1, range.col, true))) {
        break;
      }
      range.row2 = index + 1;
    }
    for (let index = range.row; index > 0; index -= 1) {
      if (!equals(panel.getCellData(index - 1, range.col, true), panel.getCellData(index, range.col, true))) {
        break;
      }
      range.row = index - 1;
    }
  }

  mergedRange(panel, range) {
    for (let index = range.col, length = panel.columns.length - 1; index < length; index += 1) {
      if (!equals(panel.getCellData(range.row, index, true), panel.getCellData(range.row, index + 1, true))) {
        break;
      }
      range.col2 = index + 1;
    }
    for (let index = range.col; index > 0; index -= 1) {
      if (!equals(panel.getCellData(range.row, index - 1, true), panel.getCellData(range.row, index, true))) {
        break;
      }
      range.col = index - 1;
    }
  }

  getMergedRange(panel, row, col) {
    const range = new CellRange(row, col);
    if (isCell(panel) && (this.indexes.length === 0 || this.indexes.includes(col))) {
      this.#cellMergedRange(panel, range);
    } else {
      this.mergedRange(panel, range);
    }
    return range;
  }
}

class GroupMergeManager extends SimpleMergeManager {
  #group;

  constructor(index, ...indexes) {
    super(...indexes);
    this.index = index;
  }

  #createGroup(panel) {
    this.#group = [];
    for (let index = 0, length = panel.rows.length - 1; index < length; index += 1) {
      if (this.#group.length === 0) {
        this.#group.push(index + 1);
      } else if (equals(panel.getCellData(index, this.index, true), panel.getCellData(index + 1, this.index, true))) {
        this.#group.splice(this.#group.length - 1, 1, index + 1);
      } else {
        this.#group.push(index + 1);
      }
    }
  }

  #findGroup(row) {
    for (let index = 0, length = this.#group.length; index < length; index += 1) {
      const group = this.#group[index];
      if (row <= group) {
        return index;
      }
    }
  }

  #cellMergedRange(panel, range) {
    for (let index = range.row, length = panel.rows.length - 1; index < length; index += 1) {
      if (this.#findGroup(index) !== this.#findGroup(index + 1)) {
        break;
      }
      if (!equals(panel.getCellData(index, range.col, true), panel.getCellData(index + 1, range.col, true))) {
        break;
      }
      range.row2 = index + 1;
    }
    for (let index = range.row; index > 0; index -= 1) {
      if (this.#findGroup(index - 1) !== this.#findGroup(index)) {
        break;
      }
      if (!equals(panel.getCellData(index - 1, range.col, true), panel.getCellData(index, range.col, true))) {
        break;
      }
      range.row = index - 1;
    }
  }

  getMergedRange(panel, row, col) {
    if (typeof this.#group === 'undefined') {
      this.#createGroup(panel);
    }
    const range = new CellRange(row, col);
    if (isCell(panel) && (this.indexes.length === 0 || this.indexes.includes(col))) {
      this.#cellMergedRange(panel, range);
    } else {
      this.mergedRange(panel, range);
    }
    return range;
  }
}

export { SimpleMergeManager, GroupMergeManager };

class ValidatorManager {
  constructor(flex, validator = {}) {
    this.flex = flex;
    this.validator = validator;
    this.#init();
  }

  #init() {
    for (const column of this.flex.columns) {
      column.validator = this.validator[column.binding] || (() => true);
    }

    this.flex.cellEditEnding.addHandler(async (s, e) => {
      const { row: r, col: c } = e;
      const column = e.getColumn();
      const { ok, message = '' } = await column.validator(s.activeEditor.value, s, e);
      if ((e.cancel = e.stayInEditMode = !ok)) {
        s.startEditing(false, r, c);
        const element = s.cells.getCellElement(r, c);
        s._edtHdl._setCellError(element, message);
      }
    });
  }
}

export { ValidatorManager };
