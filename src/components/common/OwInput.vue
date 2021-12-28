<template>
  <div class="ow-input" ref="root">
    <input :id="expando" type="text" v-model="inputValue" />
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'OwInput',
  props: {
    label: String,
    modelValue: String,
  },
  setup(props, { emit }) {
    const root = ref(null);

    const expando = computed(() => {
      return 'ow-input-' + ('' + Math.random()).replace(/\D/g, '');
    });

    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    onMounted(() => {
      if (props.label) {
        const label = document.createElement('label');
        label.classList.add('t');
        label.setAttribute('for', expando.value);
        label.textContent = props.label;
        root.value.parentNode.insertBefore(label, root.value);
      }
    });

    return {
      root,
      expando,
      inputValue,
    };
  },
};
</script>
