<template>
  <template v-if="label">
    <div class="filter-checkbox-label">{{ label }}</div>
  </template>
  <div class="ow-filter" ref="root" v-bind="$attrs">
    <template v-if="overflow">
      <button type="button" class="ow-filter-btn-move prev" @click="move('prev')">&#60;</button>
    </template>
    <div class="ow-filter-list" ref="filter">
      <ow-checkbox :items="items" :unique="unique" v-model="checkedValues">
        <button type="button" class="btn-check-all" :class="{ active: isAllChecked }" @click="onAllCheck">전체</button>
      </ow-checkbox>
    </div>
    <template v-if="overflow">
      <button type="button" class="ow-filter-btn-move next" @click="move('next')">&#62;</button>
    </template>
  </div>
</template>
<script>
import { reactive, computed, toRefs, onMounted, onUnmounted, ref, watch } from 'vue';
import { expando } from '@/utils';

import _ from 'lodash';

export default {
  name: 'OwFilterCheckbox',
  props: {
    label: String,
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
    const root = ref(null);
    const filter = ref(null);

    const state = reactive({
      checkedValues: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
      enabledValues: computed(() => props.items.filter((item) => !item.disabled)),
      isAllChecked: computed(() => state.enabledValues.length === state.checkedValues.length),
      overflow: false,
    });

    watch(
      () => state.checkedValues,
      (newCheckedValues, oldCheckedValues) => {
        if (_.isEmpty(newCheckedValues)) {
          if (_.isEmpty(oldCheckedValues)) {
            const first = props.items.filter((item) => !item.disabled).at(0);
            if (first) {
              oldCheckedValues = [first.value];
            }
          }
          if (oldCheckedValues) {
            state.checkedValues = oldCheckedValues;
          }
        }
      },
      { immediate: true }
    );

    const onAllCheck = () => {
      if (!state.isAllChecked) {
        state.checkedValues = state.enabledValues.map((item) => item.value);
      }
    };

    const getContentRect = (dom) => {
      let boundingClientRect;
      if (dom) {
        boundingClientRect = dom.getBoundingClientRect();
      }
      return DOMRectReadOnly.fromRect(boundingClientRect);
    };

    let index = 0;
    const move = _.throttle((direction) => {
      const { value: outer } = root;
      const { value: inner } = filter;

      const { left: outerLeft, right: outerRight } = getContentRect(outer);
      const { left: innerLeft, right: innerRight, width: innerWidth } = getContentRect(inner);

      let tx;
      switch (direction) {
        case 'prev':
          if (outerLeft > innerLeft) {
            tx = innerWidth * (index += 1) * 0.3;
          }
          break;
        case 'next':
          if (outerRight < innerRight) {
            tx = innerWidth * (index -= 1) * 0.3;
          }
          break;
      }
      if (typeof tx === 'number') {
        inner.style.transform = `translateX(${tx}px)`;
      }
    }, 300);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: outerWidth } = entry.contentRect;
        const { width: innerWidth } = getContentRect(filter.value);
        if (entry.target === root.value) {
          state.overflow = outerWidth < innerWidth;
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
      ...toRefs(state),
      onAllCheck,
      move,
    };
  },
};
</script>
<style lang="scss" scoped>
.filter-checkbox-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  line-height: 24px;
  flex-shrink: 0;
}
.ow-filter {
  width: var(--width, auto);
  .ow-filter-list {
    transition: all 0.2s ease-in-out;
  }
}
.btn-check-all {
  flex-shrink: 0;
  &.active {
    background-color: rgba(78, 149, 245, 1);
    border: solid 1px rgba(22, 108, 227, 1);
    color: rgba(255, 255, 255, 1);
  }
}
</style>
