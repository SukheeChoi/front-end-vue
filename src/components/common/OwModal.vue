<template>
  <wj-popup
    :style="`--max-width: ${size.width}px; --max-height: ${size.height}px;`"
    ref="root"
  >
    <!-- 타이틀 -->
    <div class="modal-header">
      <h5 class="modal-title">{{ title }}</h5>
      <button type="button" class="close" @click="cancel">&#120;</button>
    </div>
    <div class="modal-body">
      <div class="layer-body" :style="`--max-height: ${size.height}px`">
        <slot></slot>
      </div>
      <div class="layer-foot">
        <div class="actions">
          <slot name="action">
            <button
              type="button"
              class="ow-btn type-base color-gray"
              @click.prevent="onCancel"
            >
              {{ cancelButtonText }}
            </button>
            <button
              type="button"
              class="ow-btn type-base color-dark"
              @click.prevent="onAccept"
            >
              {{ acceptButtonText }}
            </button>
          </slot>
        </div>
        <!-- once -->
        <template v-if="once">
          <div class="once">
            <div class="ow-checkbox">
              <input type="checkbox" :id="unique" />
              <label :for="unique">팝업창 다시보지 않음</label>
            </div>
          </div>
        </template>
      </div>
    </div>
  </wj-popup>
</template>
<script>
import { PopupTrigger } from '@grapecity/wijmo.input';

import { ref, computed, onMounted, reactive, toRefs } from 'vue';

import { expando } from '@/utils';

const P = {
  XS: { width: 400, height: 320 },
  S: { width: 620, height: 522 },
  M: { width: 740, height: 522 },
  L: { width: 940, height: 522 },
  XL: { width: 1050, height: 522 },
  XXL: { width: 1200, height: 522 },
  XXXL: { width: 1541, height: 870 },
  XXXXL: { width: 1904, height: 913 },
};

export default {
  name: 'OwPopup',
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
    const state = reactive({
      control: null,
      unique: expando('ow-modal-once'),
      acceptButtonText: '',
      cancelButtonText: '',
      size: computed(() => P[props.type.toUpperCase()] || P.XS),
      resolvePromise: null,
      beforeAccept: () => true,
    });

    const root = ref(null);

    const open = (
      accept,
      options = {
        acceptButtonText: '확인',
        cancelButtonText: '취소',
      }
    ) => {
      return new Promise((resolve) => {
        state.control.hideTrigger = PopupTrigger.None;
        state.control.show(true);
        state.acceptButtonText = options.acceptButtonText || '확인';
        state.cancelButtonText = options.cancelButtonText || '취소';
        if (accept && typeof accept === 'function') {
          state.beforeAccept = accept;
        }
        state.resolvePromise = resolve;
      });
    };

    const onAccept = () => {
      if (state.beforeAccept()) {
        state.resolvePromise({ ok: true, control: state.control });
      }
    };
    const onCancel = () => {
      state.resolvePromise({ ok: false, control: state.control });
      state.control.hide();
    };

    onMounted(() => {
      state.control = root.value.control;
    });

    return {
      root,
      ...toRefs(state),
      open,
      onAccept,
      onCancel,
    };
  },
};
</script>
<style lang="scss" scoped>
.wj-popup {
  max-width: var(--max-width, 400px) !important;
  max-height: var(--max-height, 320px) !important;
  .modal-body {
    .layer-body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
      max-height: calc(var(--max-height, 320px) - 36px - 62px) !important;
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
