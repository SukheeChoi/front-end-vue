<template>
  <div class="card">
    <div class="card-header">
      Exam08Slot
    </div>
    <div class="card-body">
      <button class="btn btn-info btn-sm mr-2" @click="dialogA = true">Show DialogA</button>
      <button class="btn btn-info btn-sm mr-2" @click="dialogB = true">Show DialogB</button>
    </div>

    <DialogA v-if="dialogA" v-on:confirm="handleConfirm" @close="dialogA=false"></DialogA>
    <DialogB v-if="dialogB" v-on:login="handleLogin" @close="dialogB=flase"></DialogB>

  </div>
</template>

<script setup>
  import DialogA from "./DialogA.vue";
  import DialogB from "./DialogB.vue";
  import { ref } from "vue";

  // 반응형 속성 선언
  const dialogA = ref(false);
  const dialogB = ref(false);

  // 메소드 선언
  function handleConfirm() {
    console.log('handleConfirm() 실행');
    dialogA.value = false;
  }
  function handleLogin() {
    console.log('handleLogin() 실행');
    dialogB.value = false;
  }

  function handleClose() {
    console.log('handleClose() 실행');
    dialogA.value = false;
  }

</script>

<style scoped>
</style>