<template>
  <div class="ow-combobox" ref="root">
    <wj-combo-box
      :id="unique"
      :itemsSource="dataMap.collectionView"
      :display-member-path="dataMap.displayMemberPath"
      :selected-value-path="dataMap.selectedValuePath"
      :initialized="initialized"
    >
    </wj-combo-box>
  </div>
</template>
<script>
import { CollectionView } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';

import { computed, ref, watch, onMounted } from 'vue';
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
    items: {
      type: Object,
      default: () => {
        return new CollectionView();
      },
      validator: (items) => {
        return (
          items instanceof DataMap ||
          items instanceof CollectionView ||
          items instanceof Array
        );
      },
    },
    modelValue: [String, Number, Object],
  },
  setup(props, { emit }) {
    const root = ref(null);

    const dataMap = computed(() => {
      let items = props.items;
      if (items instanceof Array) {
        items = new CollectionView(items);
      }
      if (items instanceof CollectionView) {
        items = new DataMap(items, 'value', 'name');
      }
      return items;
    });

    const control = ref({ selectedValue: props.modelValue });
    const initialized = (combo) => {
      combo.selectedValue = control.value.selectedValue;
      control.value = combo;
    };

    watch(
      () => props.modelValue,
      () => (control.value.selectedValue = props.modelValue)
    );

    watch(
      () => control.value.selectedValue,
      () => emit('update:modelValue', control.value.selectedValue)
    );

    onMounted(() => {
      if (props.label) {
        const label = document.createElement('label');
        label.setAttribute('for', props.unique);
        label.classList.add('t');
        label.textContent = props.label;
        root.value.parentNode.insertBefore(label, root.value);
      }
    });

    return {
      root,
      dataMap,
      initialized,
    };
  },
};
</script>
<style lang="scss" scoped></style>
