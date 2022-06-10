<template>
  <ow-content>
    <div class="ow-flex-wrap search-zone">
      <slot></slot>
      <div class="item size-fix">
        <button class="ow-btn type-reference ml-auto" id="query" @click="state.store.getList()">조회</button>
      </div>
    </div>
  </ow-content>
</template>
<script>
import { reactive, ref } from 'vue';

export default {
  name: 'OwSearch',
  components: {
  },
  props: {
    store: {
      default: null
    },
  },
  setup(props) {
    let state = reactive({
      store: ref(props.store),
    })
    return {
      state
    };
  },
};
</script>
