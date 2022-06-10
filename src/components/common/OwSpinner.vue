<template>
  <template v-if="showLoadingImage">
    <div class="spinner-wrap">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </template>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'Spinner',
  setup() {
    const store = useStore();
    const showLoadingImage = computed(() => store.getters.getShowLoadingImage);

    return {
      showLoadingImage,
    };
  },
};
</script>
