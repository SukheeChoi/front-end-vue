<template>
  <template v-if="label">
    <label class="t" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-combobox" ref="root">
    <wj-combo-box
      :id="unique"
      :text-changed="textChanged"
      :placeholder="placeholder"
      :initialized="initialized"
    ></wj-combo-box>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwInput',
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-input');
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: String,
  },
  setup(props, { emit }) {
    const root = ref(null);

    const state = reactive({
      control: {
        text: props.modelValue,
      },
    });

    const initialized = (combo) => {
      combo.text = state.control.text;
      state.control = combo;
    };

    const textChanged = (combo) => {
      state.control.text = combo.text;
    };

    watch(
      () => props.modelValue,
      () => (state.control.text = props.modelValue)
    );

    watch(
      () => state.control.text,
      () => emit('update:modelValue', state.control.text)
    );

    return {
      root,
      initialized,
      textChanged,
    };
  },
};
</script>
<style lang="scss" scoped>
.t {
  display: inline-flex;
  flex: 0 0 auto;
}
.ow-combobox:after {
  display: none;
}
</style>
