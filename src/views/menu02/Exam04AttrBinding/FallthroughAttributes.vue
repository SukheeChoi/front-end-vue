<template>
  <div class="card" :id="$attrs.id">
    <div class="card-header">
      <span :class="$attrs.class" :style="$attrs.style">FallthroughAttributes</span> 
    </div>
    <div class="card-body">
      <router-link :to="$attrs.to" class="btn btn-info btn-sm mr-2">이 동</router-link>
      <button @click="$attrs.onClick" class="btn btn-info btn-sm">버 튼</button>
      <hr/>
      <button @click="handleBtn1" class="btn btn-info btn-sm mr-2">이 동</button>
      <button @click="handleBtn2" class="btn btn-info btn-sm mr-2">버 튼</button>
    </div>

  </div>
</template>

<script>
  export default {
    inheritAttrs: false
  }
</script>

<script setup>
  import { useAttrs } from"vue";
  import { useRouter } from "vue-router";
  const attrs = useAttrs();
  const router = useRouter();

  function handleBtn1() {
    router.push(attrs.to);
  }

  function handleBtn2() {
    attrs.onClick();
  }
</script>

<style scoped>
</style>