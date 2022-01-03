<template>
  <div class="loginWrap">
    <div class="owLoginWarp">
      <div class="owLogin">
        <div class="mainLogin"><i>Oway</i></div>
        <div class="loginGroup">
          <label for="selcectCompany">회사선택</label>
          <select id="" v-model="companyType">
            <option value="" disabled selected hidden>회사를 선택하세요</option>
            <option value="osstem">오스템임플란트(주)</option>
            <option value="osstemPama">오스템파마</option>
          </select>
          <label for="inputEmployeeId">사원번호</label>
          <input
            type="text"
            id="inputEmployeeId"
            v-model="employeeId"
            ref="userId"
            placeholder="사원번호"
            @keyup.enter="onClickLogin"
          />
          <label for="inputPassword">비밀번호</label>
          <input
            type="password"
            id="inputPassword"
            v-model="password"
            ref="password"
            placeholder="비밀번호"
            @keyup.enter="onClickLogin"
          />

          <label>
            <input
              type="checkbox"
              class="k-checkbox mb-05"
              v-model="checkSaveUserId"
            />
            <span class="status-title ml-10">사원번호 저장</span>
          </label>
          <label>로그인 구분</label>
          <fieldset id="radio-group2" class="radio-group login">
            <input
              type="radio"
              class="radio-type"
              id="radio-oss"
              name="radio-group2"
              checked
            /><label for="radio-oss" Style="width:30%;">정직원</label>
            <input
              type="radio"
              class="radio-type"
              id="radio-sup"
              name="radio-group2"
            /><label for="radio-sup" Style="width:30%;">협력사</label>
            <input
              type="radio"
              class="radio-type"
              id="radio-part-timer"
              name="radio-group2"
            /><label for="radio-part-timer">도급직원</label>
          </fieldset>

          <button @click="onClickLogin" class="btn-login">로그인</button>
          <p class="adressMain">
            로그인 관련 문의는 담당 관리자에게 문의하세요.<br />
            담당자 연락처: 02-1234-5678 / admin@osstem.com
          </p>
          <p class="copyright">ⓒOsstem Implant Co.,LTD. All right reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'OssLogin',
  data() {
    return {
      companyType: 'osstem',
      employeeId: '',
      password: '',
      checkSaveUserId: false,
    };
  },
  methods: {
    async onClickLogin() {
      let loginId = this.employeeId;
      console.log(this.password);
      axios
        .post('http://localhost:9080/com/login/do-login', null, {
          params: {
            loginId: this.employeeId,
            password: this.password,
          },
        })
        .then((response) => {
          const token = response.data.data;
          localStorage.setItem('token', token);
          axios.defaults.headers.common['Authorization'] =
            `Bearer ` + localStorage.getItem('token');
          axios
            .post('http://localhost:9080/com/login/user-info', null, {
              params: {
                userId: loginId,
              },
            })
            .then((response) => {
              console.log(response);
              const userInfo = response.data.data;
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              this.$router.push('/');
            });
        });
    },
  },
};
</script>
<style lang="scss" scoped></style>
