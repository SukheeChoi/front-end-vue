<template>
  <template v-for="({ name, value, disabled = false }, index) in items" :key="value">
    <slot></slot>
    <div class="ow-checkbox">
      <input
        type="checkbox"
        :id="`${unique}-${index}`"
        :name="unique"
        :value="value"
        :disabled="disabled"
        v-model="checkedValues"
      />
      <label :for="`${unique}-${index}`">{{ name }}</label>
    </div>
  </template>
</template>
<script>
import { computed } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwCheckbox',
  props: {
    unique: {
      type: String,
      default: () => {
        return expando('ow-checkbox');
      },
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
    const checkedValues = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      checkedValues,
    };
  },
};
</script>
<style lang="scss" scoped></style>
