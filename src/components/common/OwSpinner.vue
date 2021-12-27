<template>
  <template v-if="show">
    <div class="spinner-wrap">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </template>
</template>

<script>
import { reactive } from 'vue';
export default {
  name: 'Spinner',
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    let show = reactive(props.loading);

    // onMounted(() => {
    console.log('mounted!!!!!!!!!!');
    setTimeout(() => (show = false), 3000);
    // });
    return {
      show,
    };
  },
};
</script>
