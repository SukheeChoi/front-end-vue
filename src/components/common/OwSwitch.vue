<template>
  <template v-if="label">
    <label class="switch-label" :for="unique">{{ label }}</label>
  </template>
  <div class="form-check form-switch" v-bind="$attrs">
    <input type="checkbox" class="form-check-input" :id="unique" v-model="switchValue" />
  </div>
</template>
<script>
import { computed, reactive, toRefs } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwSwitch',
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-select');
      },
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      switchValue: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.switch-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  line-height: 24px;
  flex-shrink: 0;
}
</style>
