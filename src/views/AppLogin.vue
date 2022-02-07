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
          <label for="inputLoginId">사원번호</label>
          <input
            type="text"
            id="inputLoginId"
            v-model="loginId"
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
            <input type="checkbox" class="k-checkbox mb-05" v-model="checkSaveUserId" />
            <span class="status-title ml-10">사원번호 저장</span>
          </label>
          <!-- <label>로그인 구분</label>
          <fieldset id="radio-group2" class="radio-group login">
              <input type="radio" class="radio-type" id="radio-oss" name="radio-group2" checked><label for="radio-oss" Style="width:30%;">정직원</label>
              <input type="radio" class="radio-type" id="radio-sup" name="radio-group2"><label for="radio-sup" Style="width:30%;">협력사</label>
              <input type="radio" class="radio-type" id="radio-part-timer" name="radio-group2"><label for="radio-part-timer">도급직원</label>
          </fieldset> -->
          <dl class="radio-title-wrap">
            <dt>로그인 구분</dt>
            <dd>
              <div class="radio-group">
                <div class="ow-radio">
                  <input type="radio" id="ow-radio7" name="radio-group-3" value="osstem"/>
                  <label for="ow-radio7">정직원</label>
                </div>

                <div class="ow-radio">
                  <input type="radio" id="ow-radio9" name="radio-group-3" value="partner"/>
                  <label for="ow-radio9">협력사</label>
                </div>

                <div class="ow-radio">
                  <input type="radio" id="ow-radio10" name="radio-group-3" value="contractor"/>
                  <label for="ow-radio10">도급직원</label>
                </div>
              </div>
            </dd>
          </dl>

          <button @click="getToken" class="btn-login">로그인</button>
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
import router from '@/routes/index.js';
import menuMaker from '@/routes/menuMaker.js';
import axios from 'axios';
import login from '@/api/login.js';
import restApi from '@/api/restApi.js';
import { Menu } from '@/model';
export default {
  name: 'AppLogin',
  data() {
    return {
      companyType: 'osstem',
      loginId: '',
      password: '',
      checkSaveUserId: false,
    };
  },
  methods: {
    async getToken() {
      const tokenData = await login.requestLogin('/com/Auth', this.loginId, this.password, 'osstem');
      if (tokenData.data.data !== null) {
        login.setAuth(tokenData);
        return await this.getUserInfo();
      }
    },
    async getUserInfo() {
      const userData = await login.getUserInfo('/com/Auth', this.loginId);
      if (userData.data.data !== null) {
        const userInfo = userData.data.data;
        this.$store.commit('setUserInfo', userInfo);
        return await this.getMenus();
      }
    },
    async getMenus() {
      const menuData = await login.getMenuList('/com/MenuMgr');
      if (menuData.data !== null) {
        const screenList = menuData.data.data;
        this.$store.commit('setScreenList', screenList);
        this.$router.push('/')
      }
    },
  },
};
</script>
