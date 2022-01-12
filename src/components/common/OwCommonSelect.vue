<template>
  <div class="ow-combobox" style="width: var(--input-w-150)">
    <wj-combo-box :itemsSource="items" :initialized="initialized" :all="all" :reqSelect="reqSelect"> </wj-combo-box>
  </div>
</template>
<script>
import { reactive, ref } from 'vue';
import { CollectionView } from '@grapecity/wijmo';
import { ComCode } from '@/api/comCode.js'

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
      default: true
    },
    linkCombo: {
      type: String
    },
    reqSelect: {
      type: Boolean,
      default: false
    }
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
      if(reqData) {
        return reqData;
      }

      if (codeGroup == 'totalSearch') {
        reqData = [
          {
            name: '단어명',
            value: '1',
          },
          {
            name: '영문명',
            value: '2',
          },
          {
            name: '약어',
            value: '3',
          },
          {
            name: '정의',
            value: '4',
          },
          {
            name: '요청일자',
            value: '5',
          },
          {
            name: '요청업무코드',
            value: '6',
          },
          {
            name: '요청자명',
            value: '7',
          },
        ];
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
        if (items.sourceCollection[0].value != "all") {
          const allData = { value: 'all', name: '전체' };
          items.sourceCollection.splice(0, 0, allData);
        }
      }
    }

    if (reqSelect.value) {
      if (items.sourceCollection.length > 0) {
        if (items.sourceCollection[0].value != "reqSelect") {
          const selectData = { value: null, name: '선택하세요.' };
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
