const Utils = {
  copyDefaultValues(model) {
    let data = {};

    for (var field of model.fields) {
        data = Object.assign(data, { [field.id] : field.value })
    }

    return data;
  },

  makeMsg(message, defaultMessage = "", args = [], ) {
    let resultMsg = message ? message : defaultMessage;

    if (args.length == 0) {
        return resultMsg;
    }

    for (var arg in args) {
        resultMsg = resultMsg.replace("{" + arg + "}", args[arg]);
    }

    return resultMsg;
  }
};

export default Utils;