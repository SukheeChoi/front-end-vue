<template>
  <template v-if="label">
    <div class="filter-radio-label">{{ label }}</div>
  </template>
  <div class="ow-filter" ref="root" v-bind="$attrs">
    <template v-if="overflow">
      <button type="button" class="ow-filter-btn-move prev" @click="move">&#60;</button>
    </template>
    <ul class="ow-filter-list" ref="filter">
      <template v-for="({ name, value, disabled = false }, index) in items" :key="value">
        <li>
          <input
            type="radio"
            :id="`${unique}-${index}`"
            :name="unique"
            :value="value"
            :disabled="disabled"
            v-model="checkedValue"
          />
          <label :for="`${unique}-${index}`" class="ow-filter-button">
            {{ name }}
          </label>
        </li>
      </template>
    </ul>
    <template v-if="overflow">
      <button type="button" class="ow-filter-btn-move next" @click="move">&#62;</button>
    </template>
  </div>
</template>
<script>
import { computed, onMounted, onUnmounted, reactive, ref, toRefs, watch } from 'vue';
import { expando } from '@/utils';

import _ from 'lodash';

import { hasClass } from '@grapecity/wijmo';

export default {
  name: 'OwFilterRadio',
  props: {
    label: String,
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
    step: {
      type: Number,
      default: 1,
    },
    modelValue: String,
  },
  setup(props, { emit }) {
    const root = ref(null);
    const filter = ref(null);

    const state = reactive({
      checkedValue: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
      overflow: false,
    });

    watch(
      () => state.checkedValue,
      (newCheckedValue, oldCheckedValue) => {
        if (_.isEmpty(newCheckedValue)) {
          if (_.isEmpty(oldCheckedValue)) {
            const first = props.items.filter((item) => !item.disabled).at(0);
            if (first) {
              oldCheckedValue = first.value;
            }
          }
          if (oldCheckedValue) {
            state.checkedValue = oldCheckedValue;
          }
        }
      },
      { immediate: true }
    );

    const getContentRect = (dom) => {
      let boundingClientRect;
      if (dom) {
        boundingClientRect = dom.getBoundingClientRect();
      }
      return DOMRectReadOnly.fromRect(boundingClientRect);
    };

    let index = 0;
    const move = _.throttle((e) => {
      const { value: inner } = filter;

      const isPrev = hasClass(e.target, 'prev');

      const filterList = Array.from(inner.querySelectorAll(':scope > li'));
      if (filterList.length > 0) {
        if (isPrev) {
          index = Math.max(0, (index -= props.step));
        } else {
          index = Math.min(props.items.length - 1, (index += props.step));
        }

        const { left: point1 } = getContentRect(inner);
        const { left: point2 } = getContentRect(filterList.at(index));

        inner.style.transform = `translateX(${point1 - point2}px)`;
      }
    }, 300);

    const observer = new ResizeObserver((entries) => {
      const { value: outer } = root;
      const { value: inner } = filter;

      for (const entry of entries) {
        const { width: outerWidth } = entry.contentRect;
        const { width: innerWidth } = getContentRect(inner);
        if (entry.target === outer) {
          state.overflow = outerWidth < innerWidth;
        }
      }
    });

    onMounted(() => {
      observer.observe(root.value);
      if (props.items.length > 0 && _.isEmpty(state.checkedValue)) {
        const first = props.items.filter((item) => !item.disabled).at(0);
        if (first) {
          state.checkedValue = first.value;
        }
      }
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    return {
      root,
      filter,
      ...toRefs(state),
      move,
    };
  },
};
</script>
<style lang="scss" scoped>
.filter-radio-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
}
.ow-filter {
  width: var(--width, auto);
  &-list {
    transition: all 0.2s ease-in-out;
  }
}
</style>
