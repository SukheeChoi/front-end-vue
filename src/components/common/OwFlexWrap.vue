<template>
  <div class="ow-flex-wrap" :class="classes" :style="style">
    <slot></slot>
  </div>
</template>
<script>
import { reactive, computed, toRefs } from 'vue';
export default {
  name: 'OwFlexWrap',
  props: {
    col: {
      type: Boolean,
      default: false,
    },
    gap: {
      type: Number,
      default: 6,
    },
    justify: {
      type: String,
      default: '',
      validator: (justify) => {
        return ['', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'].includes(justify);
      },
    },
    align: {
      type: String,
      default: '',
      validator: (align) => {
        return ['', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'].includes(align);
      },
    },
  },
  setup(props) {
    const state = reactive({
      classes: computed(() => {
        return {
          'dir-col': props.col,
        };
      }),
      style: computed(() => {
        return {
          'justify-content': props.justify,
          'align-items': props.align,
          '--gap': `${props.gap}px`,
        };
      }),
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
