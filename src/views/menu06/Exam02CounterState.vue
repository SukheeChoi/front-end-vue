<template>
  <div class="card">
    <div class="card-header">
      Exam02CounterState
    </div>
    <div class="card-body">
      <div>
        <h6>[Counter State 읽기]</h6>
        <p>counter/count 단방향 바인딩: {{$store.state.counter.count}}</p>
        <p>counter/count 단방향 바인딩: {{store.state.counter.count}}</p>
        <p>counter/count 단방향 바인딩: {{store.getters['counter/getCount']}}</p>
        <p>counter/count 단방향 바인딩: {{getCount()}}</p>
        <p>counter/count 단방향 바인딩: {{computedCount}}</p>
        <p>counter/count 양방향 바인딩: <input type="text" v-model="$store.state.counter.count"/></p>
      </div>
      <hr/>
      <div>
        <h6>[Counter State 변경]</h6>
        <p>count 증가값 입력: <input type="text" v-model.number="value"/></p>
        <div>
          <button @click="changeCountByMutation" class="btn btn-info btn-sm mr-2">count 변경(Mutation 동기 방식)</button>
          <button @click="changeCountByAction" class="btn btn-info btn-sm mr-2">count 변경(Action 비동기 방식)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const store = useStore();

function getCount() {
  return store.state.counter.count;
  // return store.getters['counter/getCount'];
}

// 위의 getCount() 와 같은 값을 리턴하지만, 양방향 바인딩을 지원하는 아래 코드를 권장함.
const computedCount = computed(() => {
  return store.state.counter.count;
  // return store.getters['counter/getCount'];
});

const value = ref(1);

function changeCountByMutation() {
  store.commit('counter/setCount', value.value);
}

function changeCountByAction() {
  store.dispatch('counter/setCountByAsync', {value:value.value, duration:3000});
}

</script>

<style scoped>
</style>