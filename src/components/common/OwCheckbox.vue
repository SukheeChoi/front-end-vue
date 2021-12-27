<template>
  <template v-for="({ name, value }, index) in items" :key="value">
    <slot></slot>
    <div class="ow-checkbox">
      <input
        type="checkbox"
        :id="`${expando}-${index}`"
        :name="expando"
        :value="value"
        v-model="checkedValues"
      />
      <label :for="`${expando}-${index}`">{{ name }}</label>
    </div>
  </template>
</template>
<script>
import { computed } from 'vue';
export default {
  name: 'OwCheckbox',
  props: {
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
    const expando = computed(() => {
      return 'ow-checkbox-' + ('' + Math.random()).replace(/\D/g, '');
    });

    const checkedValues = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      expando,
      checkedValues,
    };
  },
};
</script>
<style lang="scss" scoped></style>
