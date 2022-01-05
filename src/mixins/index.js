const MENU_LIST = { title: '메인', name: 'main' };

export default {
  beforeCreate() {
    // test
    this.$store.commit('addMenuList', MENU_LIST);
  },
  methods: {
    alert: function (message, options) {
      return this.$dialog.alert(message, options);
    },
    confirm: function (message, options) {
      return this.$dialog.confirm(message, options);
    },
  },
};
