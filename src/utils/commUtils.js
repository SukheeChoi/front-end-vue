import { Globalize, isString, isDate, isUndefined } from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import { DxFileUploader } from 'devextreme-vue';

const Utils = {
  copyDefaultValues(model) {
    let data = {};

    for (var field of model.fields) {
      data = Object.assign(data, {
        [field.id]: field.value,
      });
    }

    return data;
  },

  copyKeyValues(dataItem, model) {
    let data = {};

    for (var field of model.fields) {
      if (field.key && field.key == 'true') {
        data = Object.assign(data, {
          [field.id]: dataItem[field.id],
        });
      }
    }

    return data;
  },

  setDefaultValues(item, model, targetItem = null) {
    model.fields.forEach((field) => {
      if (isUndefined(item[field.id])) {
        if (targetItem) {
          item[field.id] = targetItem[field.id];
        } else {
          item[field.id] = field.value;
        }
      }
    });
  },

  makeMsg(message, defaultMessage = '', args = []) {
    let resultMsg = message ? message : defaultMessage;

    if (args.length == 0) {
      return resultMsg;
    }

    for (var arg in args) {
      resultMsg = resultMsg.replace('(' + arg + ')', args[arg]);
    }

    return resultMsg;
  },

  addChildItem(grid, targetItem, targetRow, item, childItemsPath = 'children', allowAdding = 'add') {
    if (allowAdding !== 'set') {
      Utils.setDefaultValues(item, grid.itemsSource._model);
      if (!targetItem[childItemsPath]) {
        targetItem[childItemsPath] = [];
      }
      targetItem[childItemsPath].splice(targetItem[childItemsPath].length, 0, item);
    } else {
      Utils.setDefaultValues(item, grid.itemsSource._model, targetItem);
    }
    grid.invalidate();

    const Index = Symbol('Index').toString();
    for (let i = 0; i < grid.collectionView.itemsAdded.length; i++) {
      if (grid.collectionView.itemsAdded[i][Index] === item[Index]) {
        grid.collectionView.itemsAdded.splice(i, 1);
      }
    }
    grid.collectionView.itemsAdded.push(item);
    grid.collectionView.commitNew();
    grid.collectionView.refresh();

    let newIdx = allowAdding === 'set' ? targetRow : targetRow + 1;
    if (newIdx) {
      grid.select(new wjGrid.CellRange(targetRow));
    } else {
      newIdx = Utils.getRowIndex(grid.rows, item);
      grid.select(new wjGrid.CellRange(newIdx));
    }
  },

  removeChildItem(dataItem, item, itemKey) {
    let isRemoved = false;
    if (dataItem.children) {
      let child;
      for (let i = 0; i < dataItem.children.length; i++) {
        child = dataItem.children[i];

        if (child.children) {
          Utils.removeChildItem(child, item, itemKey);
        }

        if (itemKey) {
          let cnt = 0,
            key;
          for (let k = 0; k < itemKey.length; k++) {
            key = itemKey[k];
            if (item[key] == child[key]) {
              cnt++;
            }
          }

          if (cnt > 0 && cnt === itemKey.length) {
            dataItem.children.splice(i, 1); //remove
            isRemoved = true;
            return;
          }
        }
      }
    }
    return isRemoved;
  },

  chkChildItem(dataItem, item, itemKey) {
    if (!dataItem.children) {
      return;
    }

    let isSameValid = false;
    dataItem.children.forEach((child) => {
      let cnt = 0;
      itemKey.forEach((key) => {
        if (child[key] === item[key]) {
          cnt++;
        }

        if (cnt === itemKey.length) {
          isSameValid = true;
          return;
        }
      });
    });
    return isSameValid;
  },

  setDragItemKey(dataItem, item, itemKey) {
    itemKey.forEach((key) => {
      if (dataItem[key]) {
        item[key] = dataItem[key];
      }
    });
  },

  getRowIndex(rows, item) {
    let index = 0;
    rows.forEach((row) => {
      if (row.dataItem == item) {
        index = row.index;
        return;
      }
    });
    return index;
  },

  getWjGlyph(e, type) {
    let html;
    if (type == 'button') {
      html =
        '' + '<button class="wj-btn wj-btn-glyph">' + '<span class="wj-glyph-' + e + '"></span>' + '</button>' + '';
    } else if (type == 'collapse') {
      html =
        '' +
        '<button class="wj-btn wj-btn-glyph wj-elem-collapse" tabindex="-1" aria-label="Toggle Group">' +
        '<span class="wj-glyph-' +
        e +
        '"></span>' +
        '</button>' +
        '';
    } else if (type == 'icon') {
      html = '' + '<span class="ow-btn type-icon">' + '<i class="' + 'ow-icon ' + e + '">' + '</i>' + '</span>' + '';
    } else {
      html = '<span class="wj-glyph-' + e + '"></span>';
    }
    return html;
  },

  getOwIcon(e) {
    return '' + '<span class="ow-btn type-icon">' + '<i class="' + 'ow-icon ' + e + '">' + '</i>' + '</span>' + '';
  },

  formatDate(date, format = 'yyyy-MM-dd') {
    if (!date) {
      return '';
    }
    if (!isDate(date)) {
      date = Utils.toDate(date);
    }

    return Globalize.format(new Date(date), format);
  },

  toDate(date_str) {
    if (!date_str) {
      return;
    }
    const yyyyMMdd = String(date_str);

    if (!isString(date_str) || yyyyMMdd.length != 8) {
      return date_str;
    }

    const sYear = yyyyMMdd.substring(0, 4),
      sMonth = yyyyMMdd.substring(4, 6),
      sDate = yyyyMMdd.substring(6, 8);

    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
  },
};

export default Utils;
