<template>
  <div class="ow-flex-wrap dir-col">
    <div class="item">
      <div class="ow-flex-wrap">
        <div class="item" v-for="component in components" :key="component">
          <component :is="component.default"></component>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="ow-flex-wrap">
        <div class="item" v-for="component in components" :key="component">
          <component :is="component.default"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue';

import OwPanel from '@/components/common/OwPanel';

export default {
  name: 'AppDashboard',
  components: {
    OwPanel,
  },
  props: ['components'],
  setup(props) {
    const { components } = props;

    // const state =

    return {};
  },
};
</script>
<style lang="scss" scoped>
.ow-flex-wrap {
  --wrap: wrap;

  height: 100%;

  .item {
    .ow-panel {
      height: 100%;
    }
  }
}
</style>
