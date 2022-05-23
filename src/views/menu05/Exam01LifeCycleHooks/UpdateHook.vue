<template>
  <div class="card">
    <div class="card-header">
      UpdateHook
    </div>
    <div class="card-body">
      <p>Count: {{count}}</p>
      <p>Method Return Value: {{method()}}</p>
      <button @click="count++" class="btn btn-info btn-sm mr-2">증가</button>
      <button @click="count--" class="btn btn-info btn-sm mr-2">감소</button>
    </div>
  </div>
</template>

<script setup>
  import { onBeforeUpdate, onUpdated, ref } from 'vue';

  // 반응형 속성 선언
  const count = ref(0);

  // LifeCycle Hook 호출
  onBeforeUpdate(() => {
    console.log('onBeforeUpdate Hook');
  });

  onUpdated(() => {
    console.log('onUpdated');
  });

  function method() {
    console.log('method() 실행');
    return count.value * 100;
  }

</script>

<style scoped>
</style>