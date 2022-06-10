<template>
  <template v-if="label">
    <label class="select-label" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-combobox" ref="root" v-bind="$attrs">
    <wj-combo-box
      :id="unique"
      :items-source="dataMap.itemsSource"
      :display-member-path="dataMap.displayMemberPath"
      :selected-value-path="dataMap.selectedValuePath"
      :placeholder="placeholder"
      :is-read-only="readonly"
      :initialized="initialized"
    ></wj-combo-box>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue';

import { isPrimitive, CollectionView } from '@grapecity/wijmo';
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
    readonly: Boolean,
    items: {
      type: [Array, CollectionView, DataMap],
      default: () => {
        return new DataMap(new CollectionView(), 'value', 'name');
      },
    },
    modelValue: [String, Number, Object],
  },
  setup(props, { emit }) {
    const root = ref();

    const dataMap = computed(() => {
      const selectedValue = props.modelValue;
      let itemsSource = props.items;
      let displayMemberPath = 'name';
      let selectedValuePath = 'value';
      if (itemsSource instanceof DataMap) {
        displayMemberPath = itemsSource.displayMemberPath;
        selectedValuePath = itemsSource.selectedValuePath;
        itemsSource = itemsSource.collectionView;
      }
      if (itemsSource instanceof CollectionView) {
        itemsSource = itemsSource.sourceCollection;
      }
      itemsSource = itemsSource.map((item) => {
        if (displayMemberPath in item && selectedValuePath in item) {
          return item;
        }
        if (isPrimitive(item)) {
          return {
            [displayMemberPath]: item,
            [selectedValuePath]: item,
          };
        }
        return {};
      });
      return {
        itemsSource,
        displayMemberPath,
        selectedValuePath,
        selectedValue,
      };
    });

    let control;

    const initialized = (combo) => {
      control = combo;
      control.selectedValue = props.modelValue;
      control.itemsSourceChanged.addHandler(() => (control.selectedValue = props.modelValue));
      control.selectedIndexChanged.addHandler(() => emit('update:modelValue', control.selectedValue));
      watch(
        () => props.items,
        () => control.onItemsSourceChanged()
      );
    };

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
:deep(.wj-state-readonly) {
  .wj-template {
    padding-right: 0;
  }
  .wj-input-group-btn {
    display: none !important;
  }
  .wj-form-control {
    &:read-only {
      background-color: rgba(238, 238, 238, 1);
    }
  }
}
</style>
