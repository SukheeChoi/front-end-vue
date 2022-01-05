<template>
  <div class="ow-flex-wrap" :style="computedStyle">
    <slot></slot>
  </div>
</template>
<script>
import { computed } from 'vue';
export default {
  name: 'OwFlexContainer',
  props: {
    justify: {
      type: String,
      default: '',
      validator: (justify) => {
        return [
          '',
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-around',
        ].includes(justify);
      },
    },
    align: {
      type: String,
      default: '',
      validator: (align) => {
        return [
          '',
          'flex-start',
          'flex-end',
          'center',
          'baseline',
          'stretch',
        ].includes(align);
      },
    },
  },
  setup(props) {
    const computedStyle = computed(() => {
      return {
        'justify-content': props.justify,
        'align-items': props.align,
      };
    });

    return {
      computedStyle,
    };
  },
};
</script>
