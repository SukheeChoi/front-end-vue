<template>
  <template v-if="popup">
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
      </div>
    </div>
  </template>
  <template v-else>
    <div class="tabs">
      <div class="ow-tabs">
        <template v-for="(item, index) in items" :key="item">
          <button type="button" class="ow-btn type-group" :class="{ active: isActive(index) }" @click="click(index)">
            {{ item }}
          </button>
        </template>
      </div>
    </div>
  </template>
</template>
<script>
export default {
  name: 'OwTab',
  props: {
    popup: {
      type: Boolean,
      default: false,
    },
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
.tabs {
  width: 100%;
}
.nav-item {
  cursor: pointer;
}
</style>
