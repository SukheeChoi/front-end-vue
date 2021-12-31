<template>
  <div class="ow-combobox" ref="root">
    <wj-combo-box
      :id="unique"
      :text-changed="textChanged"
      :initialized="initialized"
    ></wj-combo-box>
  </div>
</template>
<script>
import { ref, onMounted, watch } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwInput',
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-select');
      },
    },
    modelValue: [String, Number, Object],
  },
  setup(props, { emit }) {
    const root = ref(null);

    const control = ref({ text: props.modelValue });
    const initialized = (combo) => {
      combo.text = control.value.text;
      control.value = combo;
    };

    const textChanged = (combo) => {
      control.value.text = combo.text;
    };

    watch(
      () => props.modelValue,
      () => (control.value.text = props.modelValue)
    );

    watch(
      () => control.value.text,
      () => emit('update:modelValue', control.value.text)
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
