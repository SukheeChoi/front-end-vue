<template>
  <wj-popup :style="`--max-width: ${width}px;`" :fade-in="false" :fade-out="false" ref="root">
    <div class="modal-header">
      <h2 class="modal-title">{{ title }}</h2>
      <button type="button" class="close" @click="onCancel">&#120;</button>
    </div>
    <div class="modal-body">
      <div class="layer-body">
        <template v-if="show">
          <ow-flex-wrap col>
            <slot></slot>
          </ow-flex-wrap>
        </template>
      </div>
      <div class="layer-foot">
        <div class="actions">
          <slot name="action">
            <button type="button" class="ow-btn type-base color-gray" @click.prevent="onCancel">
              {{ cancelButtonText }}
            </button>
            <button type="button" class="ow-btn type-base color-dark" @click.prevent="onAccept">
              {{ acceptButtonText }}
            </button>
          </slot>
        </div>
        <div class="once" v-show="once" ref="one">
          <div class="ow-checkbox">
            <input type="checkbox" :id="unique" v-model="checkedOnce" />
            <label :for="unique">팝업창 다시보지 않음</label>
          </div>
        </div>
      </div>
    </div>
  </wj-popup>
</template>
<script>
import { ref, computed, onMounted, reactive, toRefs, watch } from 'vue';

import { Control } from '@grapecity/wijmo';
import { PopupTrigger } from '@grapecity/wijmo.input';
import { WjPopup } from '@grapecity/wijmo.vue2.input';

import { expando } from '@/utils';

const MODAL_WIDTH = {
  XS: 400,
  S: 620,
  M: 740,
  L: 940,
  XL: 1050,
  XXL: 1200,
  XXXL: 1541,
  XXXXL: 1904,
};

export default {
  name: 'OwModal',
  components: {
    WjPopup,
  },
  props: {
    type: {
      type: String,
      default: 'XS',
    },
    title: {
      type: String,
      default: '',
    },
    once: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const root = ref(null);
    const one = ref(null);

    const state = reactive({
      show: false,
      control: null,
      unique: expando('ow-modal-once'),
      acceptButtonText: '',
      cancelButtonText: '',
      width: computed(() => MODAL_WIDTH[props.type.toUpperCase()] ?? MODAL_WIDTH.XS),
      resolvePromise: null,
      beforeAccept: () => true,
      checkedOnce: false,
    });

    const open = (
      accept,
      options = {
        acceptButtonText: '확인',
        cancelButtonText: '취소',
      }
    ) => {
      return new Promise((resolve) => {
        state.checkedOnce = false;
        state.control.hideTrigger = PopupTrigger.None;
        state.control.show((state.show = true));
        state.acceptButtonText = options.acceptButtonText ?? '확인';
        state.cancelButtonText = options.cancelButtonText ?? '취소';
        if (accept && typeof accept === 'function') {
          state.beforeAccept = accept;
        }
        state.resolvePromise = resolve;
        Control.invalidateAll();
      });
    };

    const onAccept = () => {
      if (state.beforeAccept()) {
        state.resolvePromise({ ok: true, control: state.control, once: state.checkedOnce });
      }
    };
    const onCancel = () => {
      state.resolvePromise({ ok: false, control: state.control });
      state.control.hide();
    };

    const hidden = () => {
      state.show = false;
    };

    watch(
      () => props.once,
      (once) => {
        console.log('modal once', once);
      }
    );

    onMounted(() => {
      state.control = root.value.control;
    });

    return {
      root,
      one,
      ...toRefs(state),
      open,
      onAccept,
      onCancel,
      hidden,
    };
  },
};
</script>
<style lang="scss" scoped>
.wj-popup {
  width: 100%;
  max-width: var(--max-width, 400px) !important;
  .modal-body {
    .layer-body {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100px;
      max-height: calc(100vh - 36px - 62px) !important;
      overflow-y: auto;
      word-break: break-word;
    }
    .layer-foot {
      .actions {
        height: 62px;
        padding-bottom: 0;
        align-items: center;
      }
      .once {
        display: flex;
        height: 40px;
        align-items: center;
      }
    }
  }
}
</style>
