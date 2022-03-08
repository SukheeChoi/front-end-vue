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

          if (cnt === itemKey.length) {
            dataItem.children.splice(i, 1); //remove
            return;
          }
        }
      }
    }
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
};

export default Utils;