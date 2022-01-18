<template>
  <!-- TODO 화면 구성에 대한 작업이 필요함. 3x2, 2x2 등등 -->
  <div class="ow-flex-wrap dir-col" ref="root">
    <div class="item">
      <div class="ow-flex-wrap">
        <div class="item" style="height: 433px" v-for="{ default: panel } in panels" :key="panel.__hmrId">
          <component
            :is="panel"
            draggable
            @drag-start="dragstart"
            @drag-over="dragover"
            @drag-finish="dragfinish"
            @drag-end="dragend"
          ></component>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="ow-flex-wrap">
        <div class="item" style="height: 434px" v-for="component in components" :key="component">
          <component :is="component.default"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';

import { Control } from '@grapecity/wijmo';

export default {
  name: 'AppDashboard',
  components: {},
  props: ['components'],
  setup(props) {
    const root = ref(null);

    const panels = ref([...props.components]);

    const dragstart = (payload) => {
      const { event } = payload;
      event.dataTransfer.effectAllowed = 'move';
      const panel = event.target.closest('.ow-panel');
      panel.classList.add('drag-source');
    };

    const dragover = (payload) => {
      const { event } = payload;
      const panel = event.target.closest('.ow-panel');
      const source = root.value.querySelector('.drag-source');
      const target = root.value.querySelector('.drag-over');
      if (target && panel !== target) {
        target.classList.remove('drag-over');
      }
      if (source && panel !== source) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        panel.classList.add('drag-over');
      }
    };

    const dragfinish = (payload) => {
      const { event } = payload;
      const source = root.value.querySelector('.drag-source');
      const target = root.value.querySelector('.drag-over');
      if (target.draggable === false) {
        return;
      }
      if (source && target) {
        event.preventDefault();
        const detectedPanels = Array.from(root.value.querySelectorAll('.ow-panel[draggable]'));
        const source_index = detectedPanels.indexOf(source);
        const source_panel = panels.value[source_index];
        const target_index = detectedPanels.indexOf(target);
        const target_panel = panels.value[target_index];

        panels.value.splice(source_index, 1, target_panel);
        panels.value.splice(target_index, 1, source_panel);
      }
      Control.invalidateAll();
    };

    const dragend = () => {
      const source = root.value.querySelector('.drag-source');
      if (source) {
        source.classList.remove('drag-source');
      }
      const target = root.value.querySelector('.drag-over');
      if (target) {
        target.classList.remove('drag-over');
      }
    };

    return {
      root,
      panels,
      dragstart,
      dragover,
      dragfinish,
      dragend,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-content {
  --bs-gutter: 0;
}
.item {
  --align-item: flex-start;
}
</style>
