<template>
  <div class="ow-container" :style="style">
    <slot></slot>
  </div>
</template>
<script>
import { reactive, computed, toRefs } from 'vue';

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

    const state = reactive({
      style: computed(() => {
        return {
          'grid-template-rows': `repeat(${rows}, auto) 1fr`,
          '--gap-container': `${props.gap}px`,
        };
      }),
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-container {
  width: 100%;
}
</style>
