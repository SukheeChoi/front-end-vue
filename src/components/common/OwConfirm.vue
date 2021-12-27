<template>
  <ow-modal ref="root">
    {{ message }}
  </ow-modal>
</template>
<script>
import OwModal from '@/components/common/OwModal';
import { ref } from 'vue';
export default {
  name: 'OwConfirm',
  components: {
    OwModal,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup() {
    const root = ref(null);

    const open = () => root.value.open();
    const close = () => root.value.close();

    return {
      root,
      open,
      close,
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .modal-header {
    height: 0px;
  }
}
</style>
