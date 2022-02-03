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

    removeBizGrpItem(dataItem, item, itemKey) {
        if (dataItem.children) {
            let child;
            for (let i = 0; i < dataItem.children.length; i++) {
                child = dataItem.children[i];

                if (child.children) {
                    Utils.removeBizGrpItem(child, item, itemKey);
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
};

export default Utils;