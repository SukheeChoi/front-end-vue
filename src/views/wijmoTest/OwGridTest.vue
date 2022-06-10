<template>
  <ow-grid style="flex: 7"></ow-grid>
</template>

<script>
import OwGrid from '@/components/grid/OwGrid';

export default {
  components: {
    OwGrid
  }
  ,props: {
    query: {
      type: Object,
      default: function() {
         return {
           pageNo: 1
          , pageSize: 'L'
          , totalItemCount: 20
          , pageSizeList: [1, 2, 3]
         };
      },
    },
  }
}

</script>

<style>

</style>