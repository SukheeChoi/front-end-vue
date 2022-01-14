<template>
  <wj-popup
    :style="`--max-width: ${size.width}px; --max-height: ${size.outer_height}px;`"
    :fade-in="false"
    :fade-out="false"
    ref="root"
  >
    <div class="modal-header">
      <h2 class="modal-title">{{ title }}</h2>
      <button type="button" class="close" @click="onCancel">&#120;</button>
    </div>
    <div class="modal-body">
      <div class="layer-body" :style="`--max-height: ${size.height}px`">
        <template v-if="show">
          <slot></slot>
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
import { PopupTrigger } from '@grapecity/wijmo.input';

import { ref, computed, onMounted, reactive, toRefs, watch } from 'vue';

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
    const root = ref(null);
    const one = ref(null);

    const state = reactive({
      show: false,
      control: null,
      unique: expando('ow-modal-once'),
      acceptButtonText: '',
      cancelButtonText: '',
      size: computed(() => {
        const { width, height } = P[props.type.toUpperCase()] || P.XS;
        let outer_height = height;
        if (props.once) {
          outer_height += 40;
        }
        return {
          width,
          height,
          outer_height,
        };
      }),
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
  max-height: var(--max-height, 320px) !important;
  .modal-body {
    .layer-body {
      display: flex;
      justify-content: center;
      align-items: flex-start;
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
