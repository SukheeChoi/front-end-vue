<template>
  <template v-if="label">
    <label class="select-label" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-combobox" ref="root" v-bind="$attrs">
    <wj-combo-box
      :id="unique"
      :itemsSource="dataMap.collectionView"
      :display-member-path="dataMap.displayMemberPath"
      :selected-value-path="dataMap.selectedValuePath"
      :placeholder="placeholder"
      :initialized="initialized"
    ></wj-combo-box>
  </div>
</template>
<script>
import { computed, ref, watch, reactive, toRefs, nextTick, unref } from 'vue';

import { asCollectionView, CollectionView } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';
import { WjComboBox } from '@grapecity/wijmo.vue2.input';

import { expando } from '@/utils';

export default {
  name: 'OwSelect',
  components: {
    WjComboBox,
  },
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
      type: [Array, CollectionView, DataMap],
      default: () => {
        return new DataMap(new CollectionView(), 'value', 'name');
      },
    },
    modelValue: [String, Number, Object],
  },
  setup(props, { emit }) {
    const root = ref(null);

    const dataMap = computed(() => {
      let items = props.items;
      if (items instanceof Array || items instanceof CollectionView) {
        items = ref(new DataMap(asCollectionView(items), 'value', 'name'));
      }
      return unref(items);
    });

    let control;

    const initialized = (combo) => {
      control = combo;
      control.itemsSourceChanged.addHandler(() => (combo.selectedValue = props.modelValue));
      control.selectedIndexChanged.addHandler(() => emit('update:modelValue', combo.selectedValue));
      control.selectedValue = props.modelValue;
    };

    watch(
      () => props.modelValue,
      () => {
        if (control) {
          control.selectedValue = props.modelValue;
        }
      }
    );

    return {
      root,
      dataMap,
      initialized,
    };
  },
};
</script>
<style lang="scss" scoped>
.select-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  line-height: 24px;
  flex-shrink: 0;
}
:deep(.wj-control) {
  .wj-input-group-btn > .wj-btn {
    background: 0;
  }
}
</style>
