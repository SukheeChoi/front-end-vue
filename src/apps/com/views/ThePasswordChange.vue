<template>
  <!-- header -->
  <!-- <header class="headline-wrap">
      <h1 class="h1">비밀번호 변경</h1>
    </header> -->
  <!-- //header -->

  <div class="passwordWrap">
    <div class="pwGroup">
      <h1 class="h1">비밀번호 변경</h1>

      <label for="inputPassword">현재 비밀번호</label>
      <input type="password" id="" placeholder="현재 비밀번호" />

      <label for="inputPassword">새 비밀번호</label>
      <input type="password" id="" placeholder="새 비밀번호" />

      <label for="inputPassword">새 비밀번호 확인</label>
      <input type="password" id="" placeholder="새 비밀번호 확인" />

      <button @click="onClickLogin" class="btn-login">비밀번호 변경</button>
      <div class="comment">비밀번호 생성 규칙</div>
      <ul>
        <li>- 최소 8자 이상</li>
        <li>
          - 하나 이상의 특수문자(?=.*?[#?!@$%^&*-])와 대문자, 소문자, 숫자
          반드시 포함
        </li>
        <li>- 이전 비밀번호로 변경 불가</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  components: {},

  data: function () {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
