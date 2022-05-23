<template>
  <div class="card">
    <div class="card-header">
      Child
    </div>
    <div class="card-body">
      <div>
        <h6>[자식 -> 부모]</h6>
        <button @click="$emit('child-event-1', data1)" class="btn btn-info btn-sm mr-2">child-event-1 emit</button>
        <button @click="handleChildEmit2" class="btn btn-info btn-sm mr-2">child-event-2 emit</button>
      </div>
      <hr/>
      <div>
        <h6>[자식 (event) -> 부모 (props)-> 자식]</h6>
        <button @click="handleIncrementEvent" class="btn btn-info btn-sm mr-2">increment-event emit</button>
        <button @click="handleDecrementEvent" class="btn btn-info btn-sm mr-2">decrement-event emit</button>
        <p>Counter: {{counter}}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
  import { ref, defineEmits, defineProps } from "vue";

  const props = defineProps(['counter']);
  const emit = defineEmits(['child-event-2', 'increment-event', 'decrement-event']);

  const data1 = ref('value1');
  const data2 = ref(100);

  function handleChildEmit2() {
    emit('child-event-2', data1.value, data2.value);
  }

  function handleIncrementEvent() {
    emit('increment-event');
  }

  function handleDecrementEvent() {
    emit('decrement-event');
  }
</script>

<style scoped>
</style>