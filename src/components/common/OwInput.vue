<template>
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
import { reactive, ref, watch, onMounted } from 'vue';
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

    onMounted(() => {
      if (props.label) {
        const label = document.createElement('label');
        label.setAttribute('for', props.unique);
        label.classList.add('t');
        label.textContent = props.label;
        root.value.parentNode.insertBefore(label, root.value);
      }
    });

    return {
      root,
      initialized,
      textChanged,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-combobox:after {
  display: none;
}
</style>
