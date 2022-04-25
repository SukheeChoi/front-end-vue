<template>
  <div
    class="ow-file"
    @dragleave.stop.prevent="leave"
    @dragover.stop.prevent="over"
    @drop.stop.prevent="drop"
    ref="root"
  >
    <label class="ow-file-label" :for="unique">
      <template v-if="files.length">
        <template v-for="file in files" :key="file">
          <div class="ow-file-names" :title="file.name">
            <p class="ow-file-name" @click="view($event, file)">
              {{ file.name }}
            </p>
            <template v-if="!readonly">
              <button class="ow-btn type-icon delete" @click.stop.prevent="remove(file)"></button>
            </template>
          </div>
        </template>
      </template>
      <template v-else>
        <i></i>
        <p>파일 업로드</p>
      </template>
    </label>
    <template v-if="!readonly">
      <input type="file" multiple :id="unique" @input="input" ref="obj" />
    </template>
  </div>
</template>

<script>
import _ from 'lodash';

import { computed, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import { addClass, removeClass } from '@grapecity/wijmo';

import { upload, download } from '@/api/file';
import { expando } from '@/utils';

function getExtension(filename = '') {
  const at = filename.lastIndexOf('\.');
  if (at > -1) {
    return filename.substring(at + 1);
  }
  return '';
}

function asFileList(dataTransfer) {
  if (dataTransfer.items) {
    return Array.from(dataTransfer.items).map((item) => item.getAsFile());
  }
  return dataTransfer.files;
}

function asFileModel(file, id) {
  return {
    id,
    name: file.name,
    ext: getExtension(file.name),
    size: file.size,
  };
}

function getAsFileModel(file) {
  return {
    id: file.fileId,
    name: file.fileOrglNm,
    ext: file.fileXtns,
    size: file.fileSize,
  };
}

function getAsFile(item) {
  return {
    fileId: item.id,
    fileOrglNm: item.name,
    fileXtns: item.ext,
    fileSize: item.size,
  };
}

const CLS_OPAQUE = 'opaque';

export default {
  name: 'OwInputFile',
  props: {
    unique: {
      type: String,
      default: () => {
        return expando('ow-file');
      },
    },
    whiteList: String,
    readonly: Boolean,
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit, expose }) {
    const store = useStore();

    const root = ref(null);
    const obj = ref(null);

    const state = reactive({
      items: computed(() => props.items.map((item) => getAsFileModel(item))),
      values: [],
      files: computed(() => _.concat(state.items, state.values)),
    });

    const over = (e) => {
      if (props.readonly) {
        e.dataTransfer.effectAllowed = 'none';
        e.dataTransfer.dropEffect = 'none';
        return;
      }
      addClass(root.value, CLS_OPAQUE);
    };

    const leave = () => {
      if (props.readonly) {
        return;
      }
      removeClass(root.value, CLS_OPAQUE);
    };

    const drop = (e) => {
      if (props.readonly) {
        return;
      }
      removeClass(root.value, CLS_OPAQUE);
      add(asFileList(e.dataTransfer));
    };

    const input = (e) => {
      if (props.readonly) {
        e.target.value = null;
        return;
      }
      add(e.target.files);
    };

    const remove = (file) => {
      let at = -1;
      // items에서 검사
      at = state.items.indexOf(file);
      if (at > -1) {
        props.items.splice(at, 1);
        return;
      }
      // values에서 검사
      at = state.values.indexOf(file);
      if (at > -1) {
        state.values.splice(at, 1);
      }
    };

    const progress = (progressEvent) => {
      const ratio = Math.floor(progressEvent.loaded / progressEvent.total) * 100;
      if (ratio < 100) {
        store.commit('progress/set', ratio);
      } else {
        store.commit('progress/clear');
      }
    };

    const add = async (fileList) => {
      if (fileList.length === 0) {
        return;
      }
      const fileIdList = await upload(fileList, progress);
      for (let i = 0, length = fileIdList.length; i < length; i += 1) {
        const file = fileList[i];
        const fileId = fileIdList[i];
        state.values.push(asFileModel(file, fileId));
      }
      obj.value.value = null;
    };

    const view = async (e, file) => {
      e.preventDefault();
      await download(file, progress);
    };

    console.log('state', state);

    expose({
      getAsFiles: () => {
        return state.files.map((item) => getAsFile(item));
      },
    });

    return {
      root,
      obj,
      ...toRefs(state),
      over,
      leave,
      drop,
      input,
      remove,
      view,
    };
  },
};
</script>

<style lang="scss" scoped>
.ow-file-label {
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 20px;
  overflow-y: auto;
}
.ow-file-names {
  display: inline-flex;
  gap: 10px;
  & + & {
    margin-top: 8px;
  }
  .ow-file-name {
    width: 200px;
    margin-bottom: 0;
    &:hover {
      text-decoration: underline;
    }
    a {
      display: none;
    }
  }
  .delete {
    pointer-events: auto;
  }
}
i {
  margin-top: 20px;
}
p {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.opaque {
  opacity: 0.5 !important;
}
</style>
