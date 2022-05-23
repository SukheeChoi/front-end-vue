<template>
  <div class="card">
    <div class="card-header">
      Exam01EventHandling
    </div>
    <div class="card-body">
      <div>
        <h6>[Event Handling]</h6>
        <button @click="handleBtn1" class="btn btn-info btn-sm mr-2">버튼1</button>
        <button @click="handleBtn2('vue is good', $event)" class="btn btn-info btn-sm mr-2">버튼2</button>
      </div>

      <div>
        <h6>[DOM Event 객체 참조]</h6>
        <input type="text" name="userId" :value="userId" @keyup="handleInput($event)"/>
        <br/>
        입력 내용: {{userId}}
      </div>

      <div>
        <h6>[이벤트 수식어 사용]</h6>
        <a href="https://vuejs.org/guide/introduction.html" @click.prevent="handleLink">링크</a>
        <form action="https://vuejs.org/guide/introduction.html" @submit.prevent="handleForm">
          <input type="text" v-model="userId" /> <br />
          <input type="submit" value="제출" class="btn btn-success btn-sm mt-2" />
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  // 반응형 속성 선언
  const userId = ref('');

  // 메소드 선언
  function handleBtn1() {
    console.log('handleBtn1() 실행');
    // console.log(event);
    // console.log('event.target: ' + event.target);
    // console.log('event.type: ' + event.type);
  }

  function handleBtn2(message, event) {
    console.log('handleBtn2() 실행');
    console.log('message: ' + message);
    console.log(event);
    console.log('event.target: ' + event.target);
    console.log('event.type: ' + event.type);
  }

  function handleInput(event) {
    console.log('handleInput(event) 실행');
    console.log('event: ' + event);
    console.log('event.target.name: ' + event.target.name);
    console.log('event.target.value: ' + event.target.value);
  }

  function handleLink() {
    console.log("handleLink");
  }

  function handleForm() {
    console.log("handleForm");
  }

</script>

<style scoped>
</style>