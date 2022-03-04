<template>
  <router-view></router-view>
  <ow-dialog ref="dialog"></ow-dialog>
</template>
<script>
import { ref, provide } from 'vue';

import { app } from '@/main';
import { t } from '@/plugins/i18n';

export default {
  name: 'App',
  setup() {
    const dialog = ref(null);

    const acceptButtonText = t('dialog.button.accept');
    const cancelButtonText = t('dialog.button.cancel');

    const $dialog = {
      alert: (message, options = {}) => {
        return dialog.value.open(
          _.assign(
            { type: 'alert', message },
            {
              acceptButtonText,
              cancelButtonText,
            },
            options
          )
        );
      },
      confirm: (message, options = {}) => {
        return dialog.value.open(
          _.assign(
            { type: 'confirm', message },
            {
              acceptButtonText,
              cancelButtonText,
            },
            options
          )
        );
      },
    };

    provide('$dialog', (app.config.globalProperties.$dialog = $dialog));

    return {
      dialog,
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/css/index.scss';
</style>
