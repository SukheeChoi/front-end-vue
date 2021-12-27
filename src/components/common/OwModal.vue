<template>
  <wj-popup :style="`--max-width: ${size.width}px`" ref="root">
    <!-- 타이틀 -->
    <div class="modal-header">
      <h5 class="modal-title">{{ title }}</h5>
      <button type="button" class="wj-hide close" @click="onCancel">
        &#120;
      </button>
    </div>
    <div class="modal-body">
      <div class="layer-body" :style="`--max-height: ${size.height}px`">
        <slot></slot>
      </div>
      <div class="layer-foot">
        <div class="actions">
          <slot name="action">
            <!-- onCancel -->
            <button
              type="button"
              class="ow-btn type-base color-gray"
              ref="cancel"
              @click.prevent="onCancel"
            >
              취소
            </button>
            <!-- onAccept -->
            <button
              type="button"
              class="ow-btn type-base color-dark"
              ref="accept"
              @click.prevent="onAccept"
            >
              확인
            </button>
          </slot>
        </div>
        <!-- once -->
        <template v-if="once">
          <div class="once">
            <div class="ow-checkbox">
              <input type="checkbox" id="aaaa" />
              <label for="aaaa">팝업창 다시보지 않음</label>
            </div>
          </div>
        </template>
      </div>
    </div>
  </wj-popup>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
const POPUP_SIZES = {
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
    const size = computed(() => {
      return POPUP_SIZES[props.type.toUpperCase()] || POPUP_SIZES.XS;
    });

    const root = ref(null);

    const resolvedPromise = Promise.resolve();

    let control, accept, cancel;

    const show = (_accept = () => {}, _cancel = () => {}) => {
      control.value.show(true);

      accept = _accept;
      cancel = _cancel;

      return resolvedPromise;
    };

    const onAccept = (e) => {
      resolvedPromise.then(accept.call(this, e)).then(control.value.hide());
    };

    const onCancel = (e) => {
      resolvedPromise.then(cancel.call(this, e)).then(control.value.hide());
    };

    const getControl = () => {
      return control;
    };

    onMounted(() => {
      control = ref(root.value.control);
    });

    return {
      root,
      size,
      show,
      onAccept,
      onCancel,
      getControl,
    };
  },
};
</script>
<style lang="scss" scoped>
.wj-popup {
  max-width: var(--max-width, 400px) !important;
  .modal-body {
    .layer-body {
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
