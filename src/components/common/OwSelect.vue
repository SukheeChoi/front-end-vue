<template>
  <div class="ow-select">
    <select v-model="selectedValue">
      <slot></slot>
      <option v-for="{ name, value } in items" :key="value" :value="value">
        {{ name }}
      </option>
    </select>
  </div>
</template>
<script>
import { computed } from 'vue';

export default {
  name: 'OwSelect',
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelValue: [String, Number],
  },
  setup(props, { emit }) {
    const isNumber = computed(() => {
      return (
        props.modelValue instanceof Number ||
        typeof props.modelValue === 'number'
      );
    });

    const selectedValue = computed({
      get: () => props.modelValue,
      set: (value) =>
        emit('update:modelValue', isNumber.value ? +value : value),
    });

    return {
      selectedValue,
    };
  },
};
</script>
<style lang="scss" scoped></style>
