<template>
  <div class="ow-filter">
    <ul class="ow-filter-list">
      <template v-for="({ name, value }, index) in items" :key="value">
        <li>
          <input
            type="radio"
            :id="`${unique}-${index}`"
            :name="unique"
            :value="value"
            v-model="checkedValue"
          />
          <label :for="`${unique}-${index}`" class="ow-filter-button">
            {{ name }}
          </label>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { computed } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwFilterRadio',
  props: {
    unique: {
      type: String,
      default: () => {
        return expando('ow-filter-radio');
      },
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelValue: String,
  },
  setup(props, { emit }) {
    const checkedValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      checkedValue,
    };
  },
};
</script>
