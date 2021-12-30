<template>
  <div class="ow-input" ref="root">
    <input :id="unique" type="text" v-model="inputValue" />
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwInput',
  props: {
    label: String,
    modelValue: String,
  },
  setup(props, { emit }) {
    const root = ref(null);

    const unique = expando('ow-input');

    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    onMounted(() => {
      if (props.label) {
        const label = document.createElement('label');
        label.classList.add('t');
        label.setAttribute('for', unique);
        label.textContent = props.label;
        root.value.parentNode.insertBefore(label, root.value);
      }
    });

    return {
      root,
      unique,
      inputValue,
    };
  },
};
</script>
