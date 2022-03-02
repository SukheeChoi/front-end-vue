<template>
  <ow-panel>
    <template #title> 타임존 </template>
    <ow-grid :items-source="items" :header="false" :footer="false" :is-read-only="true">
      <wj-flex-grid-column header="타임존 ID" binding="a" :width="80"></wj-flex-grid-column>
      <wj-flex-grid-column header="타임존명" binding="b" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column header="오프셋" binding="c" align="center" :width="80"></wj-flex-grid-column>
      <wj-flex-grid-column header="사용여부" binding="d" align="center" :width="80"></wj-flex-grid-column>
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
        { a: '대한민국/서울', b: 'Asia/Seoul', c: '+09:00', d: 'Y' },
        { a: '일본/도쿄', b: 'Asia/Tokyo', c: '+09:00', d: 'Y' },
        { a: '중국/베이징', b: 'Asia/Beijing', c: '+08:00', d: 'Y' },
        { a: '미국/시카고', b: 'America/Chicago', c: '-06:00', d: 'Y' },
        { a: '미국/덴버', b: 'America/Denver', c: '-07:00', d: 'Y' },
        { a: '미국/LA', b: 'America/Los_Angeles', c: '-08:00', d: 'Y' },
        { a: '미국/앵커리지', b: 'America/Anchorage', c: '-09:00', d: 'Y' },
        { a: '영국/런던', b: 'Europe/London', c: '+00:00', d: 'Y' },
      ],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
