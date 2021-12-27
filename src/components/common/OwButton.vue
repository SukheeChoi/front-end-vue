<template>
  <button class="ow-btn" ref="root">
    <slot></slot>
  </button>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'OwButton',
  props: {},
  setup() {
    const root = ref(null);
    return {
      root,
    };
  },
};
</script>
<style lang="scss" scoped></style>
