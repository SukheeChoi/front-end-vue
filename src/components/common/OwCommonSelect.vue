<template>
  <div class="ow-combobox" style="width: var(--input-w-150)">
    <wj-combo-box :itemsSource="items" :initialized="initialized" :all="all"> </wj-combo-box>
  </div>
</template>
<script>
import { reactive, ref } from 'vue';
import { CollectionView } from '@grapecity/wijmo';
import { ComCode } from '@/api/comCode.js';

export default {
  name: 'OwCommonSelect',
  props: {
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
  },
  setup(props) {
    const { codeGroup } = reactive(props);

    let items = reactive(new CollectionView([]));
    let reqData = null;
    let all = ref(props.all);

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

    if (reqData && reqData.length > 0) {
      items.sourceCollection = reqData;
    }

    if (all.value) {
      if (items.sourceCollection.length > 0) {
        if (items.sourceCollection[0].value != 'all') {
          const allData = { value: 'all', name: '전체' };
          items.sourceCollection.splice(0, 0, allData);
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
