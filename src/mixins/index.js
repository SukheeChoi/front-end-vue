import { comCode } from '@/api/comCode.js';

export default {
    beforeCreate() {
        this.$store.commit('setShowLoadingImage', false);
    },
    methods: {
        alert: function(message, options) {
            return this.$dialog.alert(message, options);
        },
        success: function(message, options) {
            return this.$dialog.success(message, options);
        },
        error: function(message, options) {
            return this.$dialog.error(message, options);
        },
        confirm: function(message, options) {
            return this.$dialog.confirm(message, options);
        },
        getCode: function(code) {
            return comCode.get(code);
        }
    },
};