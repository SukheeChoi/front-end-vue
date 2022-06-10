<template>
  <template v-if="label">
    <label class="input-time-label" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-input" ref="root" v-bind="$attrs">
    <wj-input-time
      class="ow-time"
      :id="unique"
      :is-read-only="readonly"
      :format="format"
      :min="min"
      :max="max"
      :step="step"
      :initialized="initialized"
      :text-changed="textChanged"
    ></wj-input-time>
  </div>
</template>
<script>
import { reactive, ref, toRefs, watch } from 'vue';

import { Globalize } from '@grapecity/wijmo';
import { WjInputTime } from '@grapecity/wijmo.vue2.input';

import { expando } from '@/utils';

export default {
  name: 'OwInputTime',
  components: {
    WjInputTime,
  },
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-input-date');
      },
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    before: Object,
    after: Object,
    modelValue: String,
  },
  setup(props, { emit }) {
    const root = ref(null);

    const state = reactive({
      control: {
        text: props.modelValue,
      },
      format: 'HH:mm',
      min: '09:00',
      max: '18:00',
      step: 30,
    });

    const initialized = (timer) => {
      timer.text = state.control.text || state.min;
      state.control = timer;
    };

    const textChanged = (timer) => (state.control.text = timer.text);

    const setText = (text) => (state.control.text = text);

    const setValue = (value) => (state.control.value = value);

    watch(
      () => props.modelValue,
      () => (state.control.text = props.modelValue || state.min)
    );

    watch(
      () => state.control.text,
      () => emit('update:modelValue', state.control.text)
    );

    watch(
      () => props.before && props.before.modelValue,
      () => {
        const before = Globalize.parseDate(props.before.modelValue, state.format);
        const after = Globalize.parseDate(props.modelValue, state.format);
        if (after < before) {
          setText(Globalize.format(before, state.format));
        }
      }
    );

    watch(
      () => props.after && props.after.modelValue,
      () => {
        const before = Globalize.parseDate(props.modelValue, state.format);
        const after = Globalize.parseDate(props.after.modelValue, state.format);
        if (after < before) {
          setText(Globalize.format(after, state.format));
        }
      }
    );

    return {
      root,
      ...toRefs(state),
      initialized,
      textChanged,
      setText,
    };
  },
};
</script>
<style lang="scss" scoped>
.input-time-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  line-height: 24px;
  flex-shrink: 0;
}
.ow-input {
  min-width: 80px;
  height: 24px;
}

.ow-input {
  position: relative;
  min-width: 80px;
  height: 24px;
  & + & {
    margin-left: 16px;
    &::before {
      content: '~';
      position: absolute;
      top: 50%;
      left: -12px;
      transform: translateY(-50%);
    }
  }
  :deep(.wj-btn) {
    min-height: 0;
  }
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
