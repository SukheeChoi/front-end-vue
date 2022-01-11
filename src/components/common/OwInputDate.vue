<template>
  <template v-if="label">
    <label class="t" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-input" ref="root">
    <wj-input-date
      class="ow-calendar"
      :id="unique"
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
        return expando('ow-input');
      },
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
.t {
  display: inline-flex;
  flex: 0 0 auto;
}
</style>
