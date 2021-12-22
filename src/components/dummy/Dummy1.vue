<template>
  <ow-panel>
    <template #title> Dummy1 Title </template>
    <template #body>
      <wj-flex-grid :items-source="items">
        <ow-check-column v-model="columns" />
        <wj-flex-grid-column header="이름" binding="name" />
      </wj-flex-grid>
    </template>
  </ow-panel>
</template>
<script>
import OwPanel from '@/components/commons/OwPanel';

import OwCheckColumn from '@@/com/components/wijmo/grid/OwCheckColumn';

export default {
  name: 'Dummy1',
  components: {
    OwPanel,
    OwCheckColumn,
  },
  data() {
    return {
      items: [
        {
          name: '김',
        },
        {
          name: '이',
        },
        {
          name: '박',
        },
        {
          name: '최',
        },
      ],
      columns: [],
    };
  },
  mounted() {
    console.log(this.columns);
  },
  watch: {
    columns: {
      handler(value) {
        console.log('watch column:', value);
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped></style>
