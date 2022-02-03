import { ComCode } from '@/api/comCode.js';

export default {
  beforeCreate() {
    this.$store.commit('setShowLoadingImage', false);
  },
  methods: {
    alert(...args) {
      return this.$dialog.alert(...args);
    },
    confirm(...args) {
      return this.$dialog.confirm(...args);
    },
    getCode(code, displayFormat, selectedValuePath, displayMemberPath) {
      return ComCode.get(code, displayFormat, selectedValuePath, displayMemberPath);
    },
    getCodeValue(code, displayFormat, selectedValuePath, displayMemberPath) {
      return ComCode.getValue(code, displayFormat, selectedValuePath, displayMemberPath);
    },
  },
};
