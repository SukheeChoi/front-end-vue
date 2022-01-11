<template>
  <wj-combo-box :itemsSource="items" :initialized="initialized" :all="all"> </wj-combo-box>
</template>
<script>
import { reactive, ref } from 'vue';
import { CollectionView } from '@grapecity/wijmo';
import restApi from '@/api/restApi.js';
import { useStore } from 'vuex';

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
      type: String
    }
  },
  setup(props) {
    const { codeGroup } = reactive(props);

    let items = reactive(new CollectionView([]));
    let reqData = null;
    let all = ref(props.all);

    const uri = '/com/';
    const id = '';

    const initialized = (option) => {
      if (!option.displayMemberPath) {
        option.displayMemberPath = 'name';
      }

      if (!option.selectedValuePath) {
        option.selectedValuePath = 'value';
      }
    };

    //getlist test
    function getList(codeGroup) {

      reqData = useStore().state.comData[codeGroup];
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

    // const getList = (codeGroup) => {
    //   let reqData = restApi.getList(uri, Object.assign(codeGroup), id);

    //   if (reqData && reqData.data.data.length > 0) {
    //     items.clear();
    //     items = reqData.data.data;
    //   }
    // };

    if (codeGroup) {
      getList(codeGroup);
    }

    if (reqData && reqData.length > 0) {
      items.sourceCollection = reqData;
    }

    if (all.value) {
      if (items.sourceCollection.length > 0) {
        if (items.sourceCollection[0].value != "all") {
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
