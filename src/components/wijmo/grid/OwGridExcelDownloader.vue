<template>
  <div class="ow-grid-downloader" ref="root"></div>
  <template v-if="progress">
    <div class="wj-popup-backdrop"></div>
    <wj-linear-gauge :is-read-only="true" :min="0" :max="100" :value="progress"></wj-linear-gauge>
  </template>
</template>
<script>
import { FlexGrid } from '@grapecity/wijmo.grid';
import { FlexGridXlsxConverter } from '@grapecity/wijmo.grid.xlsx';
import { WjLinearGauge } from '@grapecity/wijmo.vue2.gauge';

import { reactive, ref, toRefs } from 'vue';

export default {
  inheritAttrs: false,
  name: 'OwGridExcelDownloader',
  components: {
    WjLinearGauge,
  },
  setup() {
    const root = ref(null);

    const state = reactive({
      progress: 0,
    });

    const createHost = () => {
      const host = document.createElement('div');
      root.value.appendChild(host);
      return host;
    };

    const onComplete = (host, flex) => {
      console.log('on complete', host, flex);
      host.remove();
      flex.dispose();
      state.progress = 0;
    };

    const onProgress = (progress) => {
      console.log('on progress', (state.progress = progress));
    };

    const onError = (reason) => {
      console.log('on error', reason);
    };

    const exec = (cols = [], itemsSource = [], filename = new Date().toString(), options = {}) => {
      const host = createHost();
      const columns = cols
        .filter((col) => col.binding && col.header.trim())
        .map((col) => {
          const { binding, header, width, format } = col;
          return {
            binding,
            header,
            width,
            format,
          };
        });
      const flex = new FlexGrid(host, {
        autoGenerateColumns: false,
        columns,
        itemsSource,
      });
      FlexGridXlsxConverter.saveAsync(
        flex,
        options,
        filename,
        () => {
          onComplete(host, flex);
        },
        onError,
        onProgress,
        true
      );
    };
    console.log(state);
    return {
      root,
      ...toRefs(state),
      exec,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-grid-downloader {
  display: none;
  width: 0;
  height: 0;
}
.wj-popup-backdrop {
  z-index: 999;
}
.wj-gauge {
  position: absolute;
  width: 90%;
  height: 50px;
  z-index: 999;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
