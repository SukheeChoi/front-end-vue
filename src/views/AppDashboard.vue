<template>
  <!-- TODO 화면 구성에 대한 작업이 필요함. 3x2, 2x2 등등 -->
  <ow-flex-wrap class="size-full" style="--wrap: wrap" ref="root">
    <template v-for="{ default: panel } in panels" :key="panel">
      <component
        :is="panel"
        style="min-width: calc(33% - 3px); height: calc(50% - 3px)"
        draggable
        @drag-start="dragstart"
        @drag-over="dragover"
        @drag-finish="dragfinish"
        @drag-end="dragend"
      ></component>
    </template>
    <!--
    <template v-for="panel in panels" :key="panel">
      <ow-panel>
        <template #title>{{ panel.scrnNm }}</template>
        <component
          :is="getPanel(panel)"
          style="min-width: calc(33% - 3px); height: calc(50% - 3px)"
          draggable
          @drag-start="dragstart"
          @drag-over="dragover"
          @drag-finish="dragfinish"
          @drag-end="dragend"
        ></component>
      </ow-panel>
    </template>
-->
  </ow-flex-wrap>
</template>
<script>
import { defineAsyncComponent, reactive, ref, toRefs, computed } from 'vue';

import { Control } from '@grapecity/wijmo';
import { useStore } from 'vuex';

export default {
  name: 'AppDashboard',
  components: {},
  props: ['components'],
  setup(props) {
    const store = useStore();
    const root = ref(null);

    const state = reactive({
      panels: props.components,
      //panels: computed(() => store.getters.getDsbdMpngScrnList),
    });

    const getPanel = (panel) =>
      defineAsyncComponent(() => {
        return import('@@/' + panel.path);
      });

    const getRoot = () => {
      return root.value.$el;
    };

    const dragstart = (payload) => {
      const { event } = payload;
      event.dataTransfer.effectAllowed = 'move';
      const panel = event.target.closest('.ow-panel');
      panel.classList.add('drag-source');
    };

    const dragover = (payload) => {
      const { event } = payload;
      const panel = event.target.closest('.ow-panel');
      const source = getRoot().querySelector('.drag-source');
      const target = getRoot().querySelector('.drag-over');
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
      const source = getRoot().querySelector('.drag-source');
      const target = getRoot().querySelector('.drag-over');
      if (target.draggable === false) {
        return;
      }
      if (source && target) {
        event.preventDefault();
        const detectedPanels = Array.from(getRoot().querySelectorAll('.ow-panel[draggable]'));
        const source_index = detectedPanels.indexOf(source);
        const source_panel = state.panels[source_index];
        const target_index = detectedPanels.indexOf(target);
        const target_panel = state.panels[target_index];

        state.panels.splice(source_index, 1, target_panel);
        state.panels.splice(target_index, 1, source_panel);
      }
      Control.invalidateAll();
    };

    const dragend = () => {
      const source = getRoot().querySelector('.drag-source');
      if (source) {
        source.classList.remove('drag-source');
      }
      const target = getRoot().querySelector('.drag-over');
      if (target) {
        target.classList.remove('drag-over');
      }
    };

    return {
      root,
      ...toRefs(state),
      getPanel,
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
  flex: 0 0 33%;
  max-width: 33%;
}
</style>
