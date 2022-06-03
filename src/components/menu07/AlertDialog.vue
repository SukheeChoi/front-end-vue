<template>
  <ModalDialogTemplateVue style="width: 400px;">
    <template v-slot:header>
      알림
    </template>

    <template v-slot:body>
      <div v-if="loading">
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-if="!loading">{{message}}</div>
    </template>

    <template v-slot:footer>
      <button class="btn btn-info btn-sm" @click="$emit('close')">닫기</button>
    </template>
  </ModalDialogTemplateVue>
</template>

<script setup>
  import ModalDialogTemplateVue from '@/components/menu02/ModalDialogTemplate.vue';
  import { defineProps } from 'vue';
  const props = defineProps(['message', 'loading']);
</script>

<style scoped>
</style>