export default {
  methods: {
    alert: function (message, options) {
      return this.$dialog.alert(message, options);
    },
    confirm: function (message, options) {
      return this.$dialog.confirm(message, options);
    },
  },
};
