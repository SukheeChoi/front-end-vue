import { Globalize, isString, isDate } from '@grapecity/wijmo';

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

  formatDate(date) {
    if (!date) {
      return '';
    }
    if (!isDate(date)) {
      date = Utils.toDate(date);
    }
    return Globalize.format(new Date(date), 'yyyy-MM-dd');
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
