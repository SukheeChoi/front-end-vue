<template>
  <nav class="navbar bg-dark navbar-dark text-white font-weight-bold">
    <router-link to="/" class="navbar-brand">
      <img src="../assets/logo.png" alt="" width="30" height="30" class="align-top mr-2"/>Vue.js
    </router-link>
    <div>
      <!-- <router-link to="/" class="btn btn-success btn-sm">로그인</router-link> -->
      <router-link v-if="$store.state.userId === ''" to="/menu07/auth/login" class="btn btn-info btn-sm">로그인</router-link>
      <button v-if="$store.state.userId !== ''" @click="handleLogout" class="btn btn-info btn-sm">로그아웃</button>
    </div>
  </nav>
</template>

 <script setup>
import apiAuth from '@/apis/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

async function handleLogout() {
  await apiAuth.logout();
  router.push('/');
}
  
  
</script>