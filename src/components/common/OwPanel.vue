<template>
  <div
    :id="unique"
    class="ow-panel"
    :draggable="draggable"
    @dragstart="dragstart($event)"
    @dragover="dragover($event)"
    @drop="dragfinish($event)"
    @dragend="dragend($event)"
    ref="root"
  >
    <div class="ow-panel-header">
      <div class="ow-panel-title">
        <h3><slot name="title"></slot></h3>
      </div>
      <div class="ow-panel-side">
        <slot name="side"></slot>
      </div>
    </div>
    <div class="ow-panel-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwPanel',
  props: {
    draggable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const root = ref(null);

    const unique = expando('ow-panel');

    const dragstart = (event) => emit('drag-start', { event, unique });
    const dragover = (event) => emit('drag-over', { event, unique });
    const dragfinish = (event) => emit('drag-finish', { event, unique });
    const dragend = (event) => emit('drag-end', { event, unique });

    return {
      root,
      unique,
      dragstart,
      dragover,
      dragfinish,
      dragend,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-panel {
  .ow-panel-body {
    height: 100%;
    overflow: auto;
  }
  &[draggable='true'] {
    &.drag-over {
      border: 1px dashed rgba(0, 0, 0, 1);
    }
    &.drag-source {
      opacity: 0.4;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      background-color: rgba(145, 200, 248, 0.75);
      transform: scale(0.9);
      transition: all 250ms;
    }
  }
  :deep(.ow-content) {
    --bs-gutter: 0;
  }
}
</style>
