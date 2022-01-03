export default {
  methods: {
    alert: function (message) {
      return this.$dialog.alert(message);
    },
    confirm: function (message) {
      return this.$dialog.confirm(message);
    },
  },
};
