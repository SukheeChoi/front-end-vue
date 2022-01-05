<template>
  <div class="ow-container" :style="computedStyle">
    <slot></slot>
  </div>
</template>
<script>
import { computed, ref } from 'vue';

export default {
  name: 'OwContainer',
  props: {
    gap: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { slots }) {
    const rows = (slots && slots.default && slots.default().length - 1) || 0;
    const gap = ref(props.gap);
    const computedStyle = computed(() => {
      return {
        'grid-template-rows': `repeat(${rows}, auto) 1fr`,
        '--gap-container': `${gap.value}px`,
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
