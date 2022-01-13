import { ComCode } from '@/api/comCode.js';

export default {
  inject: ['$dialog'],
  beforeCreate() {
    this.$store.commit('setShowLoadingImage', false);
  },
  methods: {
    alert: function (...args) {
      return this.$dialog.alert(...args);
    },
    success: function (...args) {
      return this.$dialog.alert(...args);
    },
    getCode: function (code, displayFormat, selectedValuePath, displayMemberPath) {
      return ComCode.get(code, displayFormat, selectedValuePath, displayMemberPath);
    },
    getCodeValue: function (code, displayFormat, selectedValuePath, displayMemberPath) {
      return ComCode.getValue(code, displayFormat, selectedValuePath, displayMemberPath);
    },
  },
};
