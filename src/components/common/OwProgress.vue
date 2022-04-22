<template>
  <div class="progress-wrap" v-if="progress">
    <div class="progress-container">
      <label :for="unique">{{ label }}</label>
      <progress :id="unique" :max="max" :value="progress">{{ progress }}%</progress>
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
    progress: {
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
progress {
  --width: 70%;
}
</style>
