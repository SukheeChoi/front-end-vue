<template>
  <div class="ow-select">
    <select :value="value">
      <slot></slot>
      <option v-for="{ value, name } in items" :key="value" :value="value">
        {{ name }}
      </option>
    </select>
  </div>
</template>
<script>
import { computed } from 'vue';

import _ from 'lodash';

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
    const value = computed({
      get: () => props.modelValue,
      set: (value) =>
        emit('update:modelValue', _.isNumber(value) ? +value : value),
    });
    return {
      value,
    };
  },
};
</script>
<style lang="scss" scoped></style>
