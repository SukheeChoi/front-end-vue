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
export default {
  name: 'OssLogin',
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
      const tokenData = await login.requestLogin('/com/Auth/Login', this.loginId, this.password, 'osstem');
      if (tokenData.data.data !== null) {
        login.setAuth(tokenData);
        return await this.getUserInfo();
      }
    },
    async getUserInfo() {
      const userData = await login.getUserInfo('/com/Auth/UserInfo', this.loginId);
      if (userData.data.data !== null) {
        const userInfo = userData.data.data;
        //localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.$store.commit('setUserInfo', userInfo);
        return await this.getMenus();
        //this.$router.push("/");
      }
    },
    async getMenus() {
      const menuData = await restApi.getList('/com/MenuMgr', {"userId" : "25052408", "orgCd" : "O000001055"});
      if (menuData.data !== null) {
        console.log(this.$router.options.routes);
        const menuList = menuData.data.data;
        this.$store.commit('setMenus', menuList);
        this.$router.push('/')
        //console.log(JSON.parse(menuList))
        //this.$store.commit('setMenus', JSON.parse(menuList));
        //this.$router.push('/');
        //const jsonArr = JSON.parse(menuList);
        //console.log(jsonArr);
        //this.$store.commit('setMenus', jsonArr);
        //this.$router.addRoute("com", {path: menuList[1].children[0].children[0].url, 
        //name : menuList[1].children[0].children[0].name, component: () => import('@@/com/views/TheBatchMgmt')})
        //this.$router.push(menuList[1].children[0].children[0].url);
        /*
        let newRoutes = [];
        let test = [];
        for(var i=0;i<jsonArr.length;i++){
          //newRoutes.append(menuMaker.tree(jsonArr[i]));
          test.push(menuMaker.tree(jsonArr[i], true));
        }
        console.log(test);
        for(var i=0;i<test.length;i++){
          console.log(test[i]);
          //router.addRoute(test[i]);
          this.$router.addRoute(test[i]);
          //this.$router.options.routes.push(test[i]);
        }
        //router.addRoute(...test);
        router.options.routes.push(...test);
        //this.$store.commit('setMenus', test);
        //console.log(test);
        //this.$router.options.routes.push(test);
        //router.push(test);
        //this.$router.addRoute(test[1]);
        //this.$router.addRoute({path:'/com', component: 'com'})
        //router.addRoute({path:'/com', component: 'com'})
        console.log(this.$router.options.routes);
        console.log(router.options.routes);
        console.log(router.getRoutes());
        router.replace(router.currentRoute.value.fullPath);
        console.log(newRoutes);
        */
      }
    },
  },
};
</script>
