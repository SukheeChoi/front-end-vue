<template>
  <div class="item" :class="classes" :style="style">
    <slot></slot>
  </div>
</template>
<script>
import { computed } from 'vue';
export default {
  name: 'OwFlexItem',
  props: {
    col: Boolean,
    fix: Boolean,
    gap: {
      type: Number,
      default: 0,
    },
    to: {
      type: String,
      default: '',
      validator: (to) => {
        return ['', 'left', 'right', 'center'].includes(to);
      },
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
    const classes = computed(() => {
      return {
        'dir-col': props.col,
        'size-fix': props.fix,
        'align-to-left': props.to === 'left',
        'align-to-right': props.to === 'right',
        'align-to-center': props.to === 'center',
      };
    });
    const style = computed(() => {
      return {
        'justify-content': props.justify,
        'align-items': props.align,
        '--gap-item': `${props.gap}px`,
      };
    });
    return {
      classes,
      style,
    };
  },
};
</script>
<style lang="scss" scoped>
.item {
  --align-item: 'flex-start';
  &.size-fix {
    --bg: transparent;
  }
  &.align-to {
    $flex: 0 0 var(--width, auto);
    &-right {
      margin-left: auto;
      flex: $flex;
    }
    &-left {
      margin-right: auto;
      flex: $flex;
    }
    &-center {
      margin: 0 auto;
      flex: $flex;
    }
  }
}
</style>
