<template>
  <ModalDialogTemplateVue style="width: 400px;">
    <template v-slot:header>
      알림
    </template>

    <template v-slot:body>
      <p>DialogA 내용입니다.</p>
    </template>

    <template v-slot:footer>
      <button class="btn btn-info btn-sm" @click="$emit('confirm')">확인</button>
      <button class="btn btn-info btn-sm" @click="$emit('close')">닫기</button>
    </template>
  </ModalDialogTemplateVue>
</template>

<script setup>
  import ModalDialogTemplateVue from '@/components/menu02/ModalDialogTemplate.vue';

</script>

<style scoped>
</style>