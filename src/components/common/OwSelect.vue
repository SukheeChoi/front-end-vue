<template>
  <template v-if="label">
    <label class="t" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-combobox" ref="root" v-bind="$attrs">
    <wj-combo-box
      :id="unique"
      :itemsSource="dataMap.collectionView"
      :display-member-path="dataMap.displayMemberPath"
      :selected-value-path="dataMap.selectedValuePath"
      :placeholder="placeholder"
      :initialized="initialized"
    >
    </wj-combo-box>
  </div>
</template>
<script>
import { CollectionView } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';

import { computed, ref, watch, reactive, toRefs } from 'vue';
import { expando } from '@/utils';

export default {
  name: 'OwSelect',
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-select');
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    items: {
      type: Object,
      default: () => {
        return new DataMap(new CollectionView(), 'value', 'name');
      },
      validator: (items) => {
        return items instanceof DataMap || items instanceof CollectionView || items instanceof Array;
      },
    },
    modelValue: [String, Number, Object],
  },
  setup(props, { emit }) {
    const root = ref(null);

    const state = reactive({
      dataMap: computed(() => {
        if (props.items instanceof Array || props.items instanceof CollectionView) {
          return ref(new DataMap(props.items, 'value', 'name'));
        }
        return props.items;
      }),
      control: {
        selectedValue: props.modelValue,
      },
    });

    const initialized = (combo) => {
      combo.selectedValue = state.control.selectedValue;
      state.control = combo;
    };

    watch(
      () => props.modelValue,
      () => (state.control.selectedValue = props.modelValue)
    );

    watch(
      () => state.control.selectedValue,
      () => emit('update:modelValue', state.control.selectedValue)
    );

    return {
      root,
      ...toRefs(state),
      initialized,
    };
  },
};
</script>
<style lang="scss" scoped>
.t {
  display: inline-flex;
  flex: 0 0 auto;

  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #333;
    vertical-align: text-top;
    margin-top: 6px;
    margin-right: 4px;
  }
}
</style>
