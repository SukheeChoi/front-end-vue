<template>
  <div class="progress-wrap" v-if="ratio > 0">
    <div class="progress-container">
      <label :for="unique">{{ label || $t('progress.label') }}</label>
      <progress :id="unique" :max="max" :value="ratio">{{ ratio }}%</progress>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

import { expando } from '@/utils';

export default {
  name: 'OwProgress',
  props: {
    unique: {
      type: String,
      default: () => {
        return expando('ow-progress');
      },
    },
    label: String,
    ratio: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-wrap {
  z-index: 99999;
  progress {
    --width: 70%;
  }
}
</style>
