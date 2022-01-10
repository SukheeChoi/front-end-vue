<template>
  <div class="tabs">
    <div class="ow-tabs type-content">
      <ul class="nav nav-tabs">
        <template v-for="(item, index) in items" :key="item">
          <li class="nav-item" @click="click(index)">
            <a class="nav-link" :class="{ active: isActive(index) }">
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
    const click = (index) => {
      emit('update:modelValue', index);
    };

    const isActive = (index) => {
      return props.modelValue === index;
    };

    return {
      click,
      isActive,
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
