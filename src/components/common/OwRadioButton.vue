<template>
  <div class="radio-button-group" :class="{ light }">
    <template v-for="({ name, value }, index) in items" :key="value">
      <input type="radio" :id="`${unique}-${index}`" :name="unique" :value="value" v-model="checkedValue" />
      <label class="radio-button" :for="`${unique}-${index}`">
        {{ name }}
      </label>
    </template>
  </div>
</template>
<script>
import { computed } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwRadioButton',
  props: {
    unique: {
      type: String,
      default: () => {
        return expando('ow-radio-button');
      },
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    light: {
      type: Boolean,
      default: false,
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
<style lang="scss" scoped>
.radio-button-group {
  display: inline-flex;
  .radio-button {
    width: auto;
    padding: 3px 10px;
  }
}
</style>
