<template>
  <teleport to="#ows-teleport-dialog">
    <ow-dialog ref="dialog"></ow-dialog>
  </teleport>
  <teleport to="#ows-teleport-progress">
    <ow-progress ref="progress"></ow-progress>
  </teleport>
</template>
<script>
import { inject, ref } from 'vue';
import { app } from '@/main';

import _ from 'lodash';

const DIALOG_TYPES = ['alert', 'confirm', 'prompt'];

export default {
  name: 'AppTeleport',
  setup() {
    const dialog = ref(null);

    const $dialog = {};
    for (const type of DIALOG_TYPES) {
      $dialog[type] = function (message, options = {}) {
        return dialog.value.open(_.assign({ type, message }, options));
      };
    }

    app.provide('$dialog', (app.config.globalProperties.$dialog = $dialog));

    return {
      dialog,
    };
  },
};
</script>

<style></style>
