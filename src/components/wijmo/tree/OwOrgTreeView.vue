<template>
  <ow-tree-view></ow-tree-view>
</template>
<script>
import { reactive } from 'vue';

import OwTreeView from '@/components/wijmo/navagation/OwTreeView';

export default {
  name: 'OwOrgTreeView',
  components: {
    OwTreeView,
  },
  props: {
    // 조직만? 조직+조직원 모두
    // 체크박스 유무
    // lazy-load-function 적극 사용 하도록 설정
    // ev. click
    // 사번, 이름, 부서코드, 부서명 (아니면 사번 만이라도)
    // ev. dbl click
    // 부서코드, 부서명
  },
  setup(props) {
    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
};
</script>
