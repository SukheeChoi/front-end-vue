<template>
  <teleport to="#ows-teleport-dialog">
    <ow-dialog ref="dialog"></ow-dialog>
  </teleport>
  <teleport to="#ows-teleport-progress">
    <ow-progress ref="progress" :ratio="ratio"></ow-progress>
  </teleport>
</template>
<script>
import _ from 'lodash';

import { computed, ref, inject, reactive, toRefs } from 'vue';
import { createNamespacedHelpers } from 'vuex';

import { app } from '@/main';

const DIALOG_TYPES = ['alert', 'confirm', 'prompt'];

const { mapGetters } = createNamespacedHelpers('progress');

export default {
  name: 'AppTeleport',
  computed: {
    ...mapGetters(['ratio']),
  },
  setup() {
    const dialog = ref();

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
