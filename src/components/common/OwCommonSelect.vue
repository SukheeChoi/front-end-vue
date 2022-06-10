<template>
  <div class="item">
    <template v-if="label">
      <label class="t">{{ label }}</label>
    </template>
    <div class="ow-combobox" style="width: var(--input-w-150)">
      <wj-combo-box :itemsSource="items" :initialized="initialized" :all="all" :reqSelect="reqSelect"> </wj-combo-box>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue';
import { CollectionView } from '@grapecity/wijmo';
import { ComCode } from '@/api/comCode.js';

export default {
  name: 'OwCommonSelect',
  props: {
    label: {
      type: String,
      default: '',
    },
    codeGroup: {
      type: String,
      default: '',
    },
    options: String,
    all: {
      type: Boolean,
      default: true,
    },
    linkCombo: {
      type: String,
    },
    reqSelect: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { codeGroup } = reactive(props);

    let items = reactive(new CollectionView([]));
    let reqData = null;
    let all = ref(props.all);
    let reqSelect = ref(props.reqSelect);

    const initialized = (option) => {
      if (!option.displayMemberPath) {
        option.displayMemberPath = 'name';
      }

      if (!option.selectedValuePath) {
        option.selectedValuePath = 'value';
      }
    };

    function getList(codeGroup) {
      reqData = ComCode.get(codeGroup);
      if (reqData) {
        return reqData;
      }
    }

    if (codeGroup) {
      getList(codeGroup);
    }

    if (reqData && !reqData.isEmpty) {
      items.sourceCollection = reqData.collectionView.sourceCollection;
    }

    if (all.value) {
      if (items.sourceCollection.length > 0) {
        if (items.sourceCollection[0].name != '전체') {
          const allData = { value: '', name: '전체' };
          items.sourceCollection.splice(0, 0, allData);
        }
      }
    }

    if (reqSelect.value) {
      if (items.sourceCollection.length > 0) {
        if (items.sourceCollection[0].value != 'reqSelect') {
          const selectData = { value: '', name: '선택하세요.' };
          items.sourceCollection.splice(0, 0, selectData);
        }
      }
    }

    return {
      initialized,
      items,
    };
  },
};
</script>
<style lang="scss" scoped></style>
