<template>
  <div class="tabs">
    <div class="ow-tabs type-content">
      <ul class="nav nav-tabs">
        <template v-for="(item, tabIndex) in items" :key="item">
          <li class="nav-item" @click="click(tabIndex)">
            <a class="nav-link" :class="{ active: currentIndex === tabIndex }">
              {{ item }}
            </a>
          </li>
        </template>
      </ul>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue';
export default {
  name: 'OwTab',
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const currentIndex = ref(props.modelValue);

    const click = (tabIndex) => {
      currentIndex.value = tabIndex;
    };

    watch(currentIndex, () => emit('update:modelValue', currentIndex));

    return {
      currentIndex,
      click,
    };
  },
};
</script>
<style lang="scss" scoped>
a {
  cursor: pointer;
}
.ow-tabs {
  justify-content: space-between;
}
</style>
