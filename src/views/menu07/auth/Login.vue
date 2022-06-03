<template>
  <div class="card">
    <div class="card-header">
      로그인
    </div>
    <div class="card-body">
      <div v-if="store.state.userId === ''">
        <div class="form-group">
          <label class="form-label">User ID</label>
          <input type="text" class="form-control" id="userId" v-model="user.id" />
        </div>
        <div class="form-group">
          <label for="userPassword" class="col-form-label">User Password</label>
          <input type="text" class="form-control" v-model="user.password" />
        </div>
        <button class="btn btn-info btn-sm" v-on:click="handleLogin">로그인</button>
      </div>

      <div v-if="store.state.userId !== ''">
        <button class="btn btn-info btn-sm mr-2" v-on:click="handleLogout">로그아웃</button>
      </div>
    </div>

    <AlertDialog v-if="alertDialog" :message="alertDialogMessage" :loading="loading" @close="alertDialog=false" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import apiAuth from '@/apis/auth';
import AlertDialog from '@/components/menu07/AlertDialog.vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const alertDialog = ref(false);
const alertDialogMessage = ref('');
const loading = ref(false);

const user = reactive({
  id: 'user'
  , password: '12345'
});

async function handleLogin() {
  alertDialog.value = true;
  loading.value = true;

  const result = await apiAuth.login(user);
  if(result === 'success') {
    alertDialog.value =false;
    alertDialogMessage.value = '';
    // router.push('...');
  } else if(result === 'fail-401') {
    console.log(result);
    alertDialogMessage.value = '로그인 실패: 아이디 또는 패스워드가 틀림';
  } else {
    console.log(result);
    alertDialogMessage.value = '로그인 실패: 네트워크 에러';
  }

  loading.value = false;
}

async function handleLogout() {
  await apiAuth.logout();
}

</script>

<style scoped>
</style>