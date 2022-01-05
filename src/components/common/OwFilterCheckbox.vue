<template>
  <div class="checkbox-group has-btn" ref="root">
    <button type="button" class="btn-check-all" :class="{ active: isAllCheck }" @click="allCheck">전체</button>
    <template v-for="({ name, value }, index) in items" :key="value">
      <slot></slot>
      <div class="ow-checkbox">
        <input type="checkbox" :id="`${unique}-${index}`" :name="unique" :value="value" v-model="checkedValues" />
        <label :for="`${unique}-${index}`">{{ name }}</label>
      </div>
    </template>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwFilterCheckbox',
  props: {
    unique: {
      type: String,
      default: () => {
        return expando('ow-filter-checkbox');
      },
    },
    label: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelValue: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const root = ref(null);

    const checkedValues = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const isAllCheck = computed(() => props.items.length === checkedValues.value.length);

    const allCheck = () => {
      const isNotFull = !isAllCheck.value;
      checkedValues.value.splice(0);
      if (isNotFull) {
        checkedValues.value.push(...props.items.map((item) => item.value));
      }
    };

    onMounted(() => {
      if (props.label) {
        const label = document.createElement('div');
        label.classList.add('title-field');
        label.textContent = props.label;
        root.value.parentNode.insertBefore(label, root.value);
      }
    });

    return {
      root,
      isAllCheck,
      checkedValues,
      allCheck,
    };
  },
};
</script>
<style lang="scss" scoped>
.btn-check-all {
  background-color: transparent;
  border: 1px solid transparent;
  color: rgba(51, 51, 51, 1);
  &.active {
    background-color: rgba(78, 149, 245, 1);
    border: solid 1px rgba(22, 108, 227, 1);
    color: rgba(255, 255, 255, 1);
  }
}
</style>
