<template>
  <button class="ow-btn" ref="root">
    <slot></slot>
  </button>
</template>
<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'OwButton',
  props: {
    type: {
      type: String,
      default: function () {
        return 'base';
      },
    },
    color: {
      type: String,
      default: function () {
        return '';
      },
    },
    size: {
      type: String,
      default: function () {
        return '';
      },
    },
  },
  setup(props) {
    const root = ref(null);
    onMounted(() => {
      const el = root.value;
      const cssClass = [];
      cssClass.push(`type-${props.type}`);
      if (props.color) {
        cssClass.push(`color-${props.color}`);
      }
      if (props.size) {
        cssClass.push(`size-${props.size}`);
      }
      el.classList.add(...cssClass);
    });
    return {
      root,
    };
  },
};
</script>
<style lang="scss" scoped></style>
