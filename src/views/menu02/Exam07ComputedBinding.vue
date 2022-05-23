<template>
  <div class="card">
    <div class="card-header">
      Exam07ComputedProperties
    </div>
    <div class="card-body">
      <p>name: {{name}}</p>
      <p>ssn1: {{ssn1}}</p>
      <p>ssn2: {{ssn2}}</p>
      <p>ssn: {{ssn1}}-{{ssn2.charAt(0) + "******"}}</p>
      <p>ssn: {{getSsn()}}</p>
      <p>ssn: {{computedSsn}}</p>
      <hr/>
      <button class="btn btn-info btn-sm mr-2" @click="changeName">name 속성 변경</button>
      <button class="btn btn-info btn-sm mr-2" @click="changeSsn2">ssn2 속성 변경</button>
    </div>
  </div>   
</template>

<script setup>
  // 반응형 속성 선언
  import { computed, ref } from "vue";

  const name = ref('홍길동');
  const ssn1 = ref('880515');
  const ssn2 = ref('1110345');
  const computedSsn = computed(() => {
    console.log('computed callback 실 행');
    const ssn = ssn1.value + '-' + ssn2.value.charAt(0) +'******';
    return ssn;
  });

  function getSsn() {
    console.log('getSsn() 실 행');
    const ssn = ssn1.value + '-' + ssn2.value.charAt(0) +'******';
    return ssn;
  }

  function changeName() {
    name.value += '동';
  }

  function changeSsn2() {
    ssn2.value += '2';
  }
</script>

<style scoped>

</style>