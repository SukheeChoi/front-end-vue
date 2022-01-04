<template>
  <wj-combo-box :itemsSource="items" :initialized="initialized" :all="all">
  </wj-combo-box>
</template>
<script>
import { reactive, ref } from 'vue';
import { CollectionView } from '@grapecity/wijmo';
import restApi from '@/api/restApi.js';

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
        option.selectedValuePath = 'code';
      }
    };

    //getlist test
    function getList(codeGroup) {
      if (codeGroup == 'system') {
        reqData = [
          { code: 0, name: 'CMG' },
          { code: 1, name: 'PAL' },
          { code: 2, name: 'SEI' },
          { code: 3, name: 'SAM' },
        ];
      } else if (codeGroup == 'biz') {
        reqData = [
          { biz: 0, code: 0, name: 'CIF' },
          { biz: 1, code: 0, name: 'COM' },
          { biz: 2, code: 0, name: 'OXF' },
          { biz: 3, code: 0, name: 'EAP' },
          { biz: 4, code: 0, name: 'TSK' },
          { biz: 5, code: 1, name: 'LIF' },
          { biz: 5, code: 1, name: 'LCM' },
          { biz: 5, code: 1, name: 'LOG' },
          { biz: 5, code: 1, name: 'PAT' },
          { biz: 5, code: 1, name: 'MAL' },
          { biz: 5, code: 1, name: 'MEM' },
          { biz: 6, code: 2, name: 'EIF' },
          { biz: 7, code: 2, name: 'SVC' },
          { biz: 8, code: 2, name: 'OIC' },
          { biz: 8, code: 2, name: 'INT' },
          { biz: 8, code: 2, name: 'JOB' },
          { biz: 9, code: 3, name: 'SIF' },
          { biz: 10, code: 3, name: 'SAL' },
        ];
      } else if (codeGroup == 'useYn') {
        reqData = [
          { name: 'Y', value: 'Y' },
          { name: 'N', value: 'N' },
        ];
      } else if (codeGroup == 'totalSearch') {
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
      const allData = { code: 'all', name: '전체' };
      items.sourceCollection.splice(0, 0, allData);
    }

    return {
      initialized,
      items,
    };
  },
};
</script>
<style lang="scss" scoped></style>
