<template>
  <template v-if="label">
    <label class="checkbox-label">{{ label }}</label>
  </template>
  <div class="checkbox-group" :class="{ 'has-btn': hasSlots, tansparent: transparent }">
    <slot></slot>
    <template v-for="({ name, value, disabled = false }, index) in items" :key="value">
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
  </div>
</template>
<script>
import { computed, reactive, toRefs } from 'vue';
import { expando } from '@/utils';

export default {
  name: 'OwCheckbox',
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-checkbox');
      },
    },
    transparent: {
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
  setup(props, { slots, emit }) {
    const state = reactive({
      checkedValues: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
      hasSlots: computed(() => !!slots.default),
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.checkbox-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  line-height: 24px;
  flex-shrink: 0;
}
.checkbox-group {
  padding: 0;
  &.tansparent {
    background-color: transparent !important;
  }
}
</style>
