<template>
  <div class="ow-select">
    <select @input="input">
      <option v-if="all" value="">전체</option>
      <option v-for="{ value, name } in options" :key="value" :value="value">
        {{ name }}
      </option>
    </select>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue';
export default {
  name: 'OwSelect',
  props: {
    all: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelValue: [String, Number],
  },
  setup(props, { emit }) {
    const { all, options } = reactive(props);

    const input = ({ target }) => {
      emit('update:modelValue', target.value);
    };

    onMounted(() => {
      if (!all) {
        emit('update:modelValue', options[0].value);
      }
    });

    return {
      input,
    };
  },
};
</script>
<style lang="scss" scoped></style>
