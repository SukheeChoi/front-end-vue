<template>
  <ow-modal ref="root">
    {{ message }}
    <template #action>
      <button
        type="button"
        class="ow-btn type-base color-dark"
        @click.prevent="close"
      >
        확인
      </button>
    </template>
  </ow-modal>
</template>
<script>
import OwModal from '@/components/common/OwModal';
import { ref } from 'vue';
export default {
  name: 'OwAlert',
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
:deep(.modal-header) {
  height: 0px;
}
</style>
