<template>
  <ow-checkbox :label="label" :items="items" :unique="unique" v-model="checkedValues">
    <button type="button" class="btn-check-all" :class="{ active: isAllChecked }" @click="onAllCheck">전체</button>
  </ow-checkbox>
</template>
<script>
import { reactive, computed, toRefs } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwFilterCheckbox',
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-filter-checkbox');
      },
    },
    all: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelValue: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      checkedValues: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
      enabledValues: computed(() => props.items.filter((item) => !item.disabled)),
      isAllChecked: computed(() => state.enabledValues.length === state.checkedValues.length),
    });

    const onAllCheck = () => {
      const isNotFull = !state.isAllChecked;
      state.checkedValues.splice(0);
      if (isNotFull) {
        state.checkedValues.push(...state.enabledValues.map((item) => item.value));
      }
    };

    return {
      ...toRefs(state),
      onAllCheck,
    };
  },
};
</script>
<style lang="scss" scoped>
.btn-check-all {
  &.active {
    background-color: rgba(78, 149, 245, 1);
    border: solid 1px rgba(22, 108, 227, 1);
    color: rgba(255, 255, 255, 1);
  }
}
</style>
