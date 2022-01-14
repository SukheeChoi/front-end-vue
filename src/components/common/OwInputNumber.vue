<template>
  <template v-if="label">
    <label class="input-number-label" :for="unique">{{ label }}</label>
  </template>
  <wj-input-number
    class="ow-custom-spin"
    :format="format"
    :min="min"
    :max="max"
    :step="step"
    v-bind="$attrs"
    v-model="number"
  ></wj-input-number>
</template>
<script>
import { computed, reactive, toRefs } from 'vue';
export default {
  name: 'OwInputNumber',
  props: {
    label: String,
    format: {
      type: String,
      default: 'n0',
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    step: {
      type: Number,
      default: 1,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      number: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.input-number-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  flex-shrink: 0;
  align-self: center;
}
.ow-custom-spin {
  width: var(--width, auto);
}
</style>
