<template>
  <ow-panel>
    <template #title> 언어코드 </template>
    <ow-grid :items-source="items" :header="false" :footer="false" :is-read-only="true">
      <wj-flex-grid-column header="언어코드" binding="a" align="center" :width="80"></wj-flex-grid-column>
      <wj-flex-grid-column header="언어명" binding="b" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column header="사용여부" binding="c" align="center" :width="80"></wj-flex-grid-column>
    </ow-grid>
  </ow-panel>
</template>
<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'ThePanel3',
  components: {},
  setup() {
    const state = reactive({
      items: [
        { a: 'ko', b: 'korean', c: 'Y' },
        { a: 'en', b: 'english', c: 'Y' },
        { a: 'ch', b: 'china', c: 'Y' },
        { a: 'jp', b: 'japan', c: 'Y' },
        { a: 'sp', b: 'spanish', c: 'Y' },
      ],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
