<template>
  <template v-for="({ name, value }, index) in items" :key="value">
    <slot></slot>
    <div class="ow-radio">
      <input
        type="radio"
        :id="`${expando}-${index}`"
        :name="expando"
        :value="value"
        v-model="checkedValue"
      />
      <label :for="`${expando}-${index}`">{{ name }}</label>
    </div>
  </template>
</template>
<script>
import { computed } from 'vue';
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
    const expando = computed(() => {
      return 'ow-radio-' + ('' + Math.random()).replace(/\D/g, '');
    });

    const checkedValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      expando,
      checkedValue,
    };
  },
};
</script>
<style lang="scss" scoped></style>
