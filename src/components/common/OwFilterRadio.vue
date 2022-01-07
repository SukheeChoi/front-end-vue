<template>
  <div class="ow-filter" ref="root">
    <template v-if="overflow">
      <button type="button" class="ow-filter-btn-move prev" @click="move('prev')">&#60;</button>
    </template>
    <ul class="ow-filter-list" ref="filter">
      <template v-for="({ name, value }, index) in items" :key="value">
        <li>
          <input type="radio" :id="`${unique}-${index}`" :name="unique" :value="value" v-model="checkedValue" />
          <label :for="`${unique}-${index}`" class="ow-filter-button">
            {{ name }}
          </label>
        </li>
      </template>
    </ul>
    <template v-if="overflow">
      <button type="button" class="ow-filter-btn-move next" @click="move('next')">&#62;</button>
    </template>
  </div>
</template>
<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
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
    const root = ref(null);
    const filter = ref('filter');

    const checkedValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const overflow = ref(false);

    const getContentRect = (dom) => {
      let boundingClientRect;
      if (dom) {
        boundingClientRect = dom.getBoundingClientRect();
      }
      return DOMRectReadOnly.fromRect(boundingClientRect);
    };

    let index = 0;
    const move = (direction) => {
      const { value: outer } = root;
      const { value: inner } = filter;

      const { left: outerLeft, right: outerRight } = getContentRect(outer);
      const { left: innerLeft, right: innerRight } = getContentRect(inner);

      switch (direction) {
        case 'prev':
          if (outerLeft > innerLeft) {
            if ((index -= 1) < 0) {
              index = 0;
            }
          }
          break;
        case 'next':
          if (outerRight < innerRight) {
            index += 1;
          }
          break;
      }

      const child = inner.children[index];
      if (child) {
        const { x: x1 } = getContentRect(inner),
          { x: x2 } = getContentRect(child);
        inner.style.transform = `translateX(-${x2 - x1}px)`;
      }
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: outerWidth } = entry.contentRect;
        const { width: innerWidth } = getContentRect(filter.value);
        if (entry.target === root.value) {
          overflow.value = outerWidth < innerWidth;
        }
      }
    });
    onMounted(() => {
      observer.observe(root.value);
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    return {
      root,
      filter,
      overflow,
      checkedValue,
      move,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-filter {
  width: 100%;
  overflow: hide;
  .ow-filter-list {
    transition: all 0.15s linear;
  }
}
</style>
