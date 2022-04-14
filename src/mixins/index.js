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
    prompt(...args) {
      return this.$dialog.prompt(...args);
    },
  },
};
