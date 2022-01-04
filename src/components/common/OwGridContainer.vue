<template>
  <div class="ow-container" :style="computedStyle">
    <slot></slot>
  </div>
</template>
<script>
import { computed } from 'vue';

import _ from 'lodash';

export default {
  name: 'OwGridContainer',
  props: {},
  setup(props, { slots }) {
    const slot_defaults = slots.default();

    const computedStyle = computed(() => {
      const rows = slot_defaults.length;
      return {
        'grid-template-rows': _.repeat('minmax(0, auto) ', rows - 1).concat(
          'minmax(0, 1fr)'
        ),
      };
    });

    return {
      computedStyle,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-container {
  width: 100%;
}
</style>
