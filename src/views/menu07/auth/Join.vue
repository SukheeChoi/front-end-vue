<template>
  <div class="card">
    <div class="card-header">
      Join
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-label">User ID</label>
        <input type="text" class="form-control" v-model="user.id"/>
      </div>
      <div class="form-group">
        <label class="form-label">User Name</label>
        <input type="text" class="form-control" v-model="user.name"/>
      </div>
      <div class="form-group">
        <label class="col-form-label">User Password</label>
        <input type="text" class="form-control" v-model="user.password"/>
      </div>
      <div class="form-group">
        <label class="col-form-label">User Role</label>
        <select class="form-control" name="mrole" v-model="user.role">
          <option value="ROLE_ADMIN">ROLE_ADMIN</option>
          <option value="ROLE_MANAGER">ROLE_MANAGER</option>
          <option value="ROLE_USER" selected>ROLE_USER</option>
        </select>
      </div>
      <div class="form-group">
        <label class="col-form-label">User Email</label>
        <input type="text" class="form-control" v-model="user.email"/>
      </div>
      <button class="btn btn-info btn-sm" v-on:click="handleJoin">가입</button>
    </div>

    <AlertDialog v-if="alertDialog" :message="alertDialogMessage" :loading="loading" @close="alertDialog = false" />

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import apiAuth from '@/apis/auth';
import AlertDialog from '@/components/menu07/AlertDialog.vue';

const alertDialog = ref(false);
const alertDialogMessage = ref('');
const loading = ref(false);

const user = reactive({
  id: 'user'
  , name: '사용자'
  , password: '12345'
  , role: 'ROLE_USER'
  , email: 'user@mycompany.com'
});

async function handleJoin() {
  alertDialog.value = true;
  loading.value = true;

  const result = await apiAuth.join(user);
  if(result === 'success') {
    alertDialogMessage.value = '회원 가입 성공';
    console.log(result);
  } else if(result === 'duplicated') {
    alertDialogMessage.value = '회원 가입 실패: 아이디 중복';
    console.log(result);
  } else if(result === 'fail') {
    alertDialogMessage.value = '회원 가입 실패: 서버측 오류';
    console.log(result);
  } else {
    alertDialogMessage.value = '회원 가입 실패: 네트워크 오류';
    console.log(result);
  }
  loading.value = false;
}

</script>

<style scoped>
</style>