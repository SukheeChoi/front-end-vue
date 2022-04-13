<template>
  <div class="loginWrap">
    <div class="owLoginWarp">
      <div class="owLogin">
        <div class="mainLogin"><i>Oway</i></div>
        <div class="loginGroup">
          <label for="selcectOrganization">회사선택</label>
          <select id="selcectOrganization" v-model="cmpnCd">
            <option value="OSSTEM">오스템임플란트(주)</option>
            <option value="OSSTEMPHAMA">오스템파마</option>
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
                  <input type="radio" id="OSSTEM" name="OSSTEM" value="OSSTEM" checked="checked" v-model="userType" />
                  <label for="OSSTEM">정직원</label>
                </div>

                <div class="ow-radio">
                  <input type="radio" id="PARTNER" name="PARTNER" value="PARTNER" v-model="userType" />
                  <label for="PARTNER">협력사</label>
                </div>

                <div class="ow-radio">
                  <input type="radio" id="CONTRACTOR" name="CONTRACTOR" value="CONTRACTOR" v-model="userType" />
                  <label for="CONTRACTOR">도급직원</label>
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
          <p>
            <button style="width: 45px" class="ow-btn type-util" @click="this.loginId = '25052408'">김성태</button>
            <button style="width: 45px" class="ow-btn type-util" @click="this.loginId = '25080905'">손영수</button>
            <button style="width: 45px" class="ow-btn type-util" @click="this.loginId = '25111511'">은홍기</button>
            <button style="width: 45px" class="ow-btn type-util" @click="this.loginId = '24021724'">최관식</button>
            <button style="width: 45px" class="ow-btn type-util" @click="this.loginId = '23021101'">김승기</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestLogin, getUserInfo, getMenuList } from '@/api/login.js';
import store from '@/store';
export default {
  name: 'AppLogin',
  data() {
    return {
      cmpnCd: 'OSSTEM',
      loginId: store.getters.getSavedId || '',
      password: '',
      userType: 'OSSTEM',
      checkSaveUserId: store.getters.getChecked || false,
    };
  },
  setup() {},
  methods: {
    async getToken() {
      //const tokenData = await login.requestLogin('/com/Auth', this.loginId, this.password, 'osstem');
      const tokenData = await requestLogin('/com/Auth', this.cmpnCd, this.loginId, this.password, this.userType);
      if (tokenData.data.data !== null) {
        //login.setAuth(tokenData);
        store.commit('setAuth', tokenData.data.data);

        return await this.getUserInfo();
      }
    },
    async getUserInfo() {
      //const userData = await login.getUserInfo('/com/Auth');
      const userData = await getUserInfo('/com/Auth');
      if (userData.data.data !== null) {
        const userInfo = userData.data.data;
        this.$store.commit('setUserInfo', userInfo);
        //return await this.getMenus();
        this.$router.push('/');
      }
    },
    async getMenus() {
      //const menuData = await login.getMenuList('/com/MenuMgr');
      const menuData = await getMenuList('/com/MenuMgr');
      if (menuData.data !== null) {
        const screenList = menuData.data.data;
        this.$store.commit('setScreenList', screenList);
        this.$store.commit('setRouteRootList');
        var routeRootList = this.$store.getters.getRouteRootList;
        for (var i = 0; i < routeRootList.length; i++) {
          this.$store.commit('setRouteChildList', { root: routeRootList[i], child: screenList[i + 1].children });
        }
        for (var i = 0; i < routeRootList.length; i++) {
          console.log(routeRootList);
          this.$router.addRoute(routeRootList[i]);
        }

        if (this.checkSaveUserId) {
          this.$store.commit('setSavedId', this.loginId);
        }
        this.$store.commit('setChecked', this.checkSaveUserId);

        this.$router.push('/');
      }
    },
  },
};
</script>
