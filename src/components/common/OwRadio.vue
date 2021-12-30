<template>
  <template v-for="({ name, value }, index) in items" :key="value">
    <slot></slot>
    <div class="ow-radio">
      <input
        type="radio"
        :id="`${unique}-${index}`"
        :name="unique"
        :value="value"
        v-model="checkedValue"
      />
      <label :for="`${unique}-${index}`">{{ name }}</label>
    </div>
  </template>
</template>
<script>
import { computed } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwRadio',
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelValue: String,
  },
  setup(props, { emit }) {
    const unique = computed(() => expando('ow-radio'));

    const checkedValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      unique,
      checkedValue,
    };
  },
};
</script>
<style lang="scss" scoped></style>
