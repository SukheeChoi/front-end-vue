<template>
  <div class="ow-select">
    <select :value="modelValue" @input="input">
      <!-- prepend -->
      <option v-for="{ value, name } in prepend" :key="value" :value="value">
        {{ name }}
      </option>
      <!-- append -->
      <option v-for="{ value, name } in append" :key="value" :value="value">
        {{ name }}
      </option>
    </select>
  </div>
</template>
<script>
import { onMounted } from 'vue';

import _ from 'lodash';

export default {
  name: 'OwSelect',
  props: {
    prepend: {
      type: Array,
      default: () => {
        return [];
      },
    },
    append: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelValue: [String, Number],
  },
  setup(props, { emit }) {
    const update = (value) => {
      emit('update:modelValue', _.isNumber(props.modelValue) ? +value : value);
    };

    const input = ({ target }) => {
      update(target.value);
    };

    onMounted(() => {
      update(props.modelValue);
    });

    return {
      input,
    };
  },
};
</script>
<style lang="scss" scoped></style>
