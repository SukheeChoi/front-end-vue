<template>
  <teleport to="#ows-teleport">
    <template v-for="teleportComponent in teleportComponents" :key="teleportComponent">
      <component :is="teleportComponent.is" v-bind="teleportComponent.attrs"></component>
    </template>
  </teleport>
  <teleport to="#ows-teleport-dialog">
    <ow-dialog ref="dialog"></ow-dialog>
  </teleport>
  <teleport to="#ows-teleport-progress">
    <ow-progress ref="progress" :ratio="ratio"></ow-progress>
  </teleport>
</template>
<script>
import { ref } from 'vue';
import { createNamespacedHelpers } from 'vuex';

import { app } from '@/main';

import teleports from '@/teleport';

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
        return dialog.value.open(Object.assign({ type, message }, options));
      };
    }

    app.provide('$dialog', (app.config.globalProperties.$dialog = $dialog));

    return {
      dialog,
      teleportComponents: teleports,
    };
  },
};
</script>

<style></style>
