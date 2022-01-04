<template>
  <div class="checkbox-group has-btn">
    <button
      type="button"
      class=""
      :class="{ 'btn-check-all': isAllCheck }"
      @click="allCheck"
    >
      전체
    </button>
    <template v-for="({ name, value }, index) in items" :key="value">
      <slot></slot>
      <div class="ow-checkbox">
        <input
          type="checkbox"
          :id="`${unique}-${index}`"
          :name="unique"
          :value="value"
          v-model="checkedValues"
        />
        <label :for="`${unique}-${index}`">{{ name }}</label>
      </div>
    </template>
  </div>
</template>
<script>
import { computed } from 'vue';
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
    const checkedValues = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const allCheck = () => {
      checkedValues.value.splice(0);
      checkedValues.value.push(...props.items.map((item) => item.value));
    };

    const isAllCheck = computed(
      () => props.items.length === checkedValues.value.length
    );

    return {
      isAllCheck,
      checkedValues,
      allCheck,
    };
  },
};
</script>
<style lang="scss" scoped>
// .btn-check-all {
//   display: inline-flex;
//   height: 20px;
//   padding: 0 10px;
//   align-items: center;
//   border-radius: 2px;
//   border: solid 1px $clr-checkbox-checked-line;
//   background-color: $clr-checkbox-checked;
//   color: #fff;
//   font-size: 12px;
//   font-weight: 700;
//   letter-spacing: -1px;
// }
</style>
