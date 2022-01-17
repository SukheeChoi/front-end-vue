<template>
  <template v-if="label">
    <label class="input-time-label" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-combobox" ref="root" v-bind="$attrs">
    <wj-input-time
      class="ow-time"
      :id="unique"
      :readonly="readonly"
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
import { Globalize } from '@grapecity/wijmo';
import { expando } from '@/utils';
import { reactive, ref, toRefs, watch } from 'vue';

export default {
  name: 'OwInputTime',
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
      format: 'hh:mm tt',
      min: '09:00',
      max: '18:00',
      step: 30,
    });

    const initialized = (timer) => {
      if (Globalize.parseDate(state.control.text, state.format)) {
        timer.value = state.control.text;
      } else {
        timer.value = '09:00';
      }
      state.control = timer;
    };

    const textChanged = (timer) => {
      state.control.text = timer.text;
    };

    const setText = (text) => {
      state.control.text = text;
    };

    watch(
      () => props.modelValue,
      () => (state.control.text = props.modelValue)
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
  flex-shrink: 0;
  align-self: center;
}
</style>
