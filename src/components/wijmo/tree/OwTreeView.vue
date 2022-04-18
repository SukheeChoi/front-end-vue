<template>
  <wj-tree-view
    :auto-collapse="autoCollapse"
    :is-animated="isAnimated"
    :show-checkboxes="showCheckboxes"
    :initialized="init"
  ></wj-tree-view>
</template>
<script>
import { reactive, toRefs } from 'vue';

import { WjTreeView } from '@grapecity/wijmo.vue2.nav';

export default {
  name: 'OwTreeView',
  components: {
    WjTreeView,
  },
  props: {
    autoCollapse: Boolean,
    isAnimated: Boolean,
    initialized: Function,
    showCheckboxes: Boolean,
  },
  setup(props) {
    const state = reactive({
      treeview: undefined,
    });

    const init = (s) => {
      state.treeview = s;

      s.formatItem.addHandler((s, e) => {
        const item = e.dataItem;
        let display;
        if (Array.isArray(s.displayMemberPath)) {
          for (const displayMemberPath of s.displayMemberPath) {
            if ((display = item[displayMemberPath])) {
              break;
            }
          }
        } else {
          display = item[s.displayMemberPath];
        }
        const textNode = e.element.querySelector('.wj-node-text');
        if (textNode) {
          textNode.textContent = display;
        }
      });
      if (props.initialized) {
        props.initialized(s);
      }
    };

    return {
      ...toRefs(state),
      init,
    };
  },
};
</script>
