<template>
  <div class="ow-select" ref="root">
    <select :id="unique" v-model="selectedValue">
      <slot></slot>
      <option v-for="{ name, value } in items" :key="value" :value="value">
        {{ name }}
      </option>
    </select>
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwSelect',
  props: {
    label: String,
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelValue: [String, Number],
  },
  setup(props, { emit }) {
    const root = ref(null);

    const unique = computed(() => expando('ow-select'));

    const isNumber = computed(() => {
      return (
        props.modelValue instanceof Number ||
        typeof props.modelValue === 'number'
      );
    });

    const selectedValue = computed({
      get: () => props.modelValue,
      set: (value) =>
        emit('update:modelValue', isNumber.value ? +value : value),
    });

    onMounted(() => {
      if (props.label) {
        const label = document.createElement('label');
        label.classList.add('t');
        label.setAttribute('for', unique.value);
        label.textContent = props.label;
        root.value.parentNode.insertBefore(label, root.value);
      }
    });

    return {
      root,
      unique,
      selectedValue,
    };
  },
};
</script>
<style lang="scss" scoped></style>
