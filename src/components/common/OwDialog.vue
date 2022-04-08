<template>
  <wj-popup ref="root">
    <div class="modal-body" :class="variant" ref="body">
      <div class="layer-body">
        <span>{{ message }}</span>
      </div>
      <div class="layer-foot">
        <div class="actions">
          <slot name="action">
            <template v-if="isConfirm">
              <button type="button" class="ow-btn type-base color-gray" @click.prevent="onCancel">
                {{ cancelButtonText }}
              </button>
            </template>
            <template v-if="isAlert || isConfirm">
              <button type="button" class="ow-btn type-base color-dark" @click.prevent="onAccept">
                {{ acceptButtonText }}
              </button>
            </template>
          </slot>
        </div>
      </div>
    </div>
  </wj-popup>
</template>
<script>
import _ from 'lodash';

import { ref, computed, onMounted, reactive, toRefs } from 'vue';

import { Control } from '@grapecity/wijmo';
import { PopupTrigger } from '@grapecity/wijmo.input';
import { WjPopup } from '@grapecity/wijmo.vue2.input';

export default {
  name: 'OwDialog',
  components: {
    WjPopup,
  },
  props: {},
  setup() {
    const root = ref(null);
    const body = ref(null);

    const state = reactive({
      control: null,
      type: '',
      message: '',
      variant: '',
      acceptButtonText: '',
      cancelButtonText: '',
      isAlert: computed(() => state.type === 'alert'),
      isConfirm: computed(() => state.type === 'confirm'),
      resolvePromise: null,
    });

    const open = (options) => {
      return new Promise((resolve) => {
        state.control.hideTrigger = PopupTrigger.None;
        state.control.show(true);
        state.type = options.type;
        state.message = options.message;
        state.variant = options.variant;
        state.acceptButtonText = options.acceptButtonText;
        state.cancelButtonText = options.cancelButtonText;
        state.resolvePromise = resolve;
      });
    };

    const onAccept = () => {
      state.resolvePromise(true);
      state.control.hide();
    };

    const onCancel = () => {
      state.resolvePromise(false);
      state.control.hide();
    };

    // Observer를 이용하여 Modal Body가 변경되면 invalidateAll을 수행한다.
    const observer = new ResizeObserver(_.debounce(() => Control.invalidateAll(), 100));

    onMounted(() => {
      state.control = root.value.control;
      observer.observe(body.value);
    });

    return {
      root,
      body,
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
  width: 100%;
  max-width: 400px !important;
  max-height: 320px !important;
  .modal-body {
    &.success {
      color: #004085;
      background-color: #cce5ff;
      border-color: #b8daff;
    }
    &.error {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
    .layer-body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
      max-height: 222px !important;
      padding-bottom: 0;
      & > span {
        max-height: calc(222px - var(--bs-gutter, 0px) * 2);
        overflow-y: auto;
        word-break: break-word;
        color: inherit;
      }
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
