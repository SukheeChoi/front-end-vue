<template>
  <div class="ow-grid-downloader" ref="root"></div>
  <template v-if="progress">
    <div class="progress-wrap">
      <div class="progress-container">
        <label for="file">Downloading progress:</label>
        <progress id="file" max="100" :value="progress">{{ progress }}%</progress>
      </div>
    </div>
  </template>
</template>
<script>
import { FlexGrid } from '@grapecity/wijmo.grid';
import { FlexGridXlsxConverter } from '@grapecity/wijmo.grid.xlsx';

import { inject, reactive, ref, toRefs } from 'vue';

export default {
  inheritAttrs: false,
  name: 'OwGridExcelDownloader',
  components: {},
  setup() {
    const root = ref(null);

    const state = reactive({
      progress: 0,
    });

    const $dialog = inject('$dialog');

    const createHost = () => {
      const host = document.createElement('div');
      root.value.appendChild(host);
      return host;
    };

    const onComplete = (host, flex) => {
      host.remove();
      flex.dispose();
      state.progress = 0;
    };

    const onProgress = (progress) => {
      state.progress = progress;
    };

    const onError = (reason) => {
      FlexGridXlsxConverter.cancelAsync(() => {
        $dialog.alert(reason);
        state.progress = 0;
      });
    };

    const exec = (cols = [], itemsSource = [], filename = new Date().toString(), options = {}) => {
      const host = createHost();
      const columns = cols
        .filter((col) => col.binding && col.header.trim())
        .map((col) => {
          const { binding, header, align, width, format } = col;
          return {
            binding,
            header,
            align,
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#file {
  --width: 70%;
}
</style>
