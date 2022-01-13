<template>
  <template v-if="label">
    <label class="radio-label">{{ label }}</label>
  </template>
  <div class="radio-group">
    <template v-for="({ name, value, disabled = false }, index) in items" :key="value">
      <slot></slot>
      <div class="ow-radio">
        <input
          type="radio"
          :id="`${unique}-${index}`"
          :name="unique"
          :value="value"
          :disabled="disabled"
          v-model="checkedValue"
        />
        <label :for="`${unique}-${index}`">{{ name }}</label>
      </div>
    </template>
  </div>
</template>
<script>
import { computed } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwRadio',
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-radio');
      },
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelValue: String,
  },
  setup(props, { emit }) {
    const checkedValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      checkedValue,
    };
  },
};
</script>
<style lang="scss" scoped>
.radio-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  flex-shrink: 0;
}
</style>
