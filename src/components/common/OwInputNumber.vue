<template>
  <template v-if="label">
    <label class="input-number-label" :for="unique">{{ label }}</label>
  </template>
  <div>
    <wj-input-number
      class="ow-custom-spin"
      :format="format"
      :min="min"
      :max="max"
      :step="step"
      :is-read-only="readonly"
      v-bind="$attrs"
      v-model="number"
    ></wj-input-number>
  </div>
</template>
<script>
import { computed, reactive, toRefs } from 'vue';

import { WjInputNumber } from '@grapecity/wijmo.vue2.input';

import { expando } from '@/utils';
export default {
  name: 'OwInputNumber',
  components: {
    WjInputNumber,
  },
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-input');
      },
    },
    readonly: {
      type: Boolean,
      default: false,
    },
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
  line-height: 24px;
  flex-shrink: 0;
}
.ow-custom-spin {
  width: var(--width, 100%);
}
:deep(.wj-state-readonly) {
  .wj-template {
    padding-right: 0;
  }
  .wj-input-group-btn {
    display: none !important;
  }
  .wj-form-control {
    &:read-only {
      background-color: rgba(238, 238, 238, 1);
    }
  }
}
</style>
