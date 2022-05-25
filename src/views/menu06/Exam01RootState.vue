<template>
  <div class="card">
    <div class="card-header">
      Exam01RootState
    </div>
    <div class="card-body">
      <div>
        <h6>[Root State 읽기]</h6>
        <p>userId 단방향 바인딩: {{$store.state.userId}}</p>
        <p>userId 단방향 바인딩: {{store.state.userId}}</p>
        <p>userId 단방향 바인딩: {{store.getters.getUserId}}</p>
        <p>userId 단방향 바인딩: {{getUserId()}}</p>
        <p>userId 단방향 바인딩: {{computedUserId}}</p>
        <p>userId 양방향 바인딩: <input type="text" v-model="$store.state.userId"/></p>
      </div>
      <hr/>
      <div>
        <h6>[Root State 변경]</h6>
        <p>userId 변경값 입력: <input type="text" v-model="userId"/></p>
        <div>
          <button @click="changeUserIdByMutation" class="btn btn-info btn-sm mr-2">userId 변경(Mutation 동기 방식)</button>
          <button @click="changeUserIdByAction" class="btn btn-info btn-sm mr-2">userId 변경(Action 비동기 방식)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  import { computed, ref } from 'vue';
  const store = useStore();

  function getUserId() {
    return store.state.userId;
    // return store.getters.getUserId;
  }

  const computedUserId = computed(() => {
    return store.state.userId;
    // return store.getters.getUserId;
  });

  const userId = ref('');

  function changeUserIdByMutation() {
    store.commit('setUserId', userId.value);
  }

  function changeUserIdByAction() {
    store.dispatch('setUserIdByAsync', {userId: userId.value, duration: 3000});
  }

</script>

<style scoped>
</style>