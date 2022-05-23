<template>
  <ModalDialogTemplateVue style="width: 500px;">
    <template v-slot:header>
      로그인
    </template>

    <template v-slot:body>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autocomplete="email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" autocomplete="new-password">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
      </form>
    </template>

    <template v-slot:footer>
      <button class="btn btn-info btn-sm" @click="$emit('login')">로그인</button>
      <button class="btn btn-info btn-sm" @click="$emit('close')">취소</button>
    </template>
  </ModalDialogTemplateVue>
</template>

<script setup>
  import ModalDialogTemplateVue from '@/components/menu02/ModalDialogTemplate.vue';

</script>

<style scoped>
</style>