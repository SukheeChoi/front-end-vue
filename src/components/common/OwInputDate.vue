<template>
  <template v-if="label">
    <label class="input-date-label" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-input" ref="root" v-bind="$attrs">
    <wj-input-date
      class="ow-calendar"
      :id="unique"
      :readonly="readonly"
      :format="format"
      :initialized="initialized"
      :text-changed="textChanged"
    ></wj-input-date>
  </div>
</template>
<script>
import { Globalize } from '@grapecity/wijmo';
import { ref, watch, reactive } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwInputDate',
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
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    before: Object,
    after: Object,
    modelValue: {
      type: String,
      default: ({ format }) => {
        return Globalize.format(new Date(), format);
      },
    },
  },
  setup(props, { emit }) {
    const root = ref(null);

    const state = reactive({
      control: {
        text: props.modelValue,
      },
    });

    const initialized = (calendar) => {
      if (Globalize.parseDate(state.control.text, props.format)) {
        calendar.value = state.control.text;
      } else {
        calendar.value = Globalize.format(new Date(), props.format);
      }
      state.control = calendar;
    };

    const textChanged = (calendar) => {
      state.control.text = calendar.text;
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
        const before = Globalize.parseDate(props.before.modelValue, props.before.format);
        const after = Globalize.parseDate(props.modelValue, props.format);
        if (after < before) {
          setText(Globalize.format(before, props.format));
        }
      }
    );

    watch(
      () => props.after && props.after.modelValue,
      () => {
        const before = Globalize.parseDate(props.modelValue, props.format);
        const after = Globalize.parseDate(props.after.modelValue, props.after.format);
        if (after < before) {
          setText(Globalize.format(after, props.format));
        }
      }
    );

    return {
      root,
      initialized,
      textChanged,
      setText,
    };
  },
};
</script>
<style lang="scss" scoped>
.input-date-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  flex-shrink: 0;
  align-self: center;
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
}
</style>
