<template>
  <router-view></router-view>
  <ow-dialog ref="dialog"></ow-dialog>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { provide, ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const { t } = useI18n();

    const dialog = ref(null);

    const dialogOptions = {
      acceptButtonText: t('dialog.button.accept'),
      cancelButtonText: t('dialog.button.cancel'),
    };

    const $dialog = {
      alert: (message, options = {}) => {
        return dialog.value.open(Object.assign({ type: 'alert', message }, dialogOptions, options));
      },
      confirm: (message, options = {}) => {
        return dialog.value.open(Object.assign({ type: 'confirm', message }, dialogOptions, options));
      },
    };

    provide('$dialog', $dialog);

    return {
      dialog,
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/css/index.scss';
</style>
