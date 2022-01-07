<template>
  <div class="item" :class="computedClass" :style="computedStyle">
    <slot></slot>
  </div>
</template>
<script>
import { computed } from 'vue';
export default {
  name: 'OwFlexItem',
  props: {
    fix: {
      type: Boolean,
      default: false,
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
    gap: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const computedClass = computed(() => {
      return {
        'size-fix': props.fix,
      };
    });
    const computedStyle = computed(() => {
      return {
        'justify-content': props.justify,
        'align-items': props.align,
        '--gap-item': `${props.gap}px`,
      };
    });
    return {
      computedClass,
      computedStyle,
    };
  },
};
</script>
