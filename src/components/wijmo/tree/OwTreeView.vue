<template>
  <wj-tree-view
    class="ow-tree-view"
    :auto-collapse="autoCollapse"
    :is-animated="isAnimated"
    :initialize="init"
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
    initialize: Function,
  },
  setup(props) {
    const state = reactive({});

    let s;
    const init = (...args) => {
      s = args.at(0);
      if (props.initialize) {
        props.initialize();
      }
    };

    return {
      ...toRefs(state),
      init,
    };
  },
};
</script>
