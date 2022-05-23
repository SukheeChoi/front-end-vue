<template>
  <div class="card">
    <div class="card-header">
      Exam02EventEmit
    </div>
    <div class="card-body">
      <Child @child-event-1="handleChildEvent1"
            @child-event-2="handleChildEvent2"
            :counter='counter'
            @increment-event="counter++"
            @decrement-event="handleDecrementEvent" />
    </div>
  </div>
</template>

<script setup>
  import Child from './Child.vue';
  import { ref } from 'vue';

  const counter = ref(0);

  function handleChildEvent1(data1) {
    console.log('data1: ', data1);
  }

  function handleChildEvent2(data1, data2) {
    console.log('data1: ', data1);
    console.log('data2: ', data2);
  }

  function handleDecrementEvent() {
    counter.value--;
  }
</script>

<style scoped>
</style>