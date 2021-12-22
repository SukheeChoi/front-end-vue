<template>
  <div
    ref="root"
    class="ow-panel"
    :draggable="draggable"
    @dragstart="dragstart($event)"
    @dragover="dragover($event)"
    @drop="drop($event)"
    @dragend="dragend($event)"
  >
    <div class="ow-panel-header">
      <div class="ow-panel-title">
        <slot name="title"></slot>
      </div>
      <div class="ow-panel-side">
        <slot name="side"></slot>
      </div>
    </div>
    <div class="ow-panel-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'OwPanel',
  components: {},
  props: {
    panelId: {
      type: String,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const root = ref(null);

    const { panelId } = ref(props);

    const dragstart = (event) => {
      emit('drag-start', {
        event,
        panelId,
      });
    };
    const dragover = (event) => {
      emit('drag-over', {
        event,
        panelId,
      });
    };
    const drop = (event) => {
      emit('drag-finish', {
        event,
        panelId,
      });
    };
    const dragend = (event) => {
      emit('drag-end', {
        event,
        panelId,
      });
    };

    return {
      root,
      dragstart,
      dragover,
      drop,
      dragend,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-panel[draggable='true'] {
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
</style>
