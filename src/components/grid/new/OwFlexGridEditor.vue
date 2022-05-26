<template>
  <ow-modal :type="type" :title="title" ref="editor">
    <template #default="{ data }">
      <slot :data="data">
        <template v-for="column in currentGridColumns" :key="column">
          <br />binding: {{ column.binding }} | datatype: {{ column.dataType }} | value:
          {{ column._binding.getValue(data) }}
          <template v-if="column.dataMap">
            <ow-select
              label="Country"
              :items="column.dataMap"
              v-model="data.country"
              style="--width: 140px"
            ></ow-select>
          </template>
        </template>
      </slot>
    </template>
    <template #action>
      <button type="button" class="ow-btn type-base color-gray" v-if="!isNew && removable" @click.prevent="onDelete()">
        삭제
      </button>
      <button
        type="button"
        class="ow-btn type-base color-dark"
        v-if="(isNew && insertable) || (!isNew && updatable)"
        @click.prevent="$refs.editor.onAccept"
      >
        확인
      </button>
      <button type="button" class="ow-btn type-base color-gray" @click.prevent="$refs.editor.onCancel">취소</button>
    </template>
  </ow-modal>
</template>

<script>
import {
  //
  isArray,
  //
  NotifyCollectionChangedAction,
} from '@grapecity/wijmo';
import {
  //
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';

function indexOf(s, source, target) {
  let at = -1;
  if (!isArray(source)) return at;
  at = source.indexOf(target);
  if (at < 0) {
    for (const item of source) {
      at = indexOf(s, item[s.childItemsPath], target);
      if (at > -1) break;
    }
  }
  return at;
}

export default {
  name: 'OwFlexGridEditor',
  inheritAttrs: false,
  props: {
    src: { type: Array, default: [] },
    type: { type: String, default: 'L' },
  },
  setup(props) {
    const state = reactive({
      editor: ref(),
      title: '',
      dataMap: ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
      currentGridController: null,
      currentGridColumns: [],
      isNew: false,
      insertable: false,
      updatable: false,
      removable: false,
    });

    const dblclick = (s, e) => {
      if (e.defaultPrevented) return;
      start(s, s.selectedItem);
    };

    const initialize = (s) => {
      // 이벤트 설정
      if (s.doubleClick) {
        s.doubleClick.removeHandler(dblclick);
        s.doubleClick.addHandler(dblclick);
      }

      // 에디터 설정
      s.editor = {
        start: start.bind(null, s),
      };
    };

    const start = async (s, item) => {
      state.currentGridController = s;
      state.currentGridColumns = s.columns;
      const c = s.editableCollectionView;
      state.insertable = c.insertable;
      state.updatable = c.updatable;
      state.removable = c.removable;
      const isNew = (state.isNew = indexOf(s, c.sourceCollection, item) < 0);
      const action = isNew ? NotifyCollectionChangedAction.Add : NotifyCollectionChangedAction.Change;
      state.title = isNew ? '추가' : '수정';
      const editor = state.editor;
      const data = reactive(Object.assign({}, item));
      const { ok } = await editor.open(null, { data });
      await finish(s, data, ok ? action : NotifyCollectionChangedAction.Reset);
    };

    const finish = async (s, item, action = NotifyCollectionChangedAction.Reset) => {
      const editor = state.editor;
      const c = s.editableCollectionView;
      const isRest = c.implementsInterface('RestCollectionView');
      switch (action) {
        case NotifyCollectionChangedAction.Add:
          isRest ? await c.addItem(item) : c.addNew(item);
          break;
        case NotifyCollectionChangedAction.Remove:
          isRest ? await c.deleteItem(item) : c.remove(item);
          break;
        case NotifyCollectionChangedAction.Change:
          isRest ? await c.patchItem(item) : c.editItem(item);
          break;
        case NotifyCollectionChangedAction.Reset:
          break;
      }

      editor.hidden();

      state.currentGridController = null;

      return true;
    };

    const onDelete = (s = state.currentGridController) => {
      const item = s.selectedItem;
      const action = NotifyCollectionChangedAction.Remove;
      finish(s, item, action);
    };

    watch(
      () => props.src,
      (src) => src.forEach(initialize)
    );

    return {
      initialize,
      onDelete,
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped></style>
