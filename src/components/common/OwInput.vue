<template>
  <template v-if="label">
    <label class="input-label" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-combobox" ref="root" v-bind="$attrs">
    <wj-combo-box
      :id="unique"
      :placeholder="placeholder"
      :initialized="initialized"
      :is-read-only="readonly"
      @input="textChanged"
      @keyup.enter="lookup"
    ></wj-combo-box>
    <template v-if="search">
      <button type="button" class="btn-search" @click="lookup">조회</button>
    </template>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue';

import { WjComboBox } from '@grapecity/wijmo.vue2.input';

import { expando } from '@/utils';
export default {
  inheritAttrs: false,
  name: 'OwInput',
  components: {
    WjComboBox,
  },
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-input');
      },
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    search: {
      type: Boolean,
      default: false,
    },
    modelValue: String,
  },
  setup(props, { emit }) {
    const root = ref(null);
    const state = reactive({
      control: {
        text: props.modelValue,
      },
    });

    const initialized = (combo) => {
      combo.text = state.control.text;
      state.control = combo;
    };

    const textChanged = ({ target }) => {
      state.control.text = target.value;
    };

    const lookup = () => {
      if (props.search) {
        emit('lookup', state.control.text);
      }
    };

    watch(
      () => props.modelValue,
      () => (state.control.text = props.modelValue)
    );

    watch(
      () => state.control.text,
      () => emit('update:modelValue', state.control.text)
    );

    watch(
      () => props.readonly,
      (readonly) => (state.control.isReadOnly = readonly)
    );

    return {
      root,
      initialized,
      textChanged,
      lookup,
    };
  },
};
</script>
<style lang="scss" scoped>
.input-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  line-height: 24px;
  flex-shrink: 0;
}
.ow-combobox {
  .btn-search {
    display: inline-flex;
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 17px;
    height: 17px;
    background-image: url('~@/assets/images/icon/icon_search.svg');
    text-indent: -9999em;
    font-size: 0;
    background-color: transparent;
    border: 0;
    &:hover {
      filter: invert(31%) sepia(96%) saturate(4852%) hue-rotate(210deg) brightness(105%) contrast(103%);
    }
  }
  &:after {
    display: none;
  }
}
:deep(.wj-state-readonly) {
  .wj-form-control {
    &:read-only {
      background-color: rgba(238, 238, 238, 1);
    }
  }
}
</style>
