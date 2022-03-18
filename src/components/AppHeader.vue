<template>
  <header class="header">
    <div class="info-area">
      <router-link :to="{ name: 'main' }">
        <h1 class="logo">OW OSSTEM</h1>
      </router-link>
      <!-- TODO Breadcrumb, 위치기반, e.g. 본부명 > 메뉴 1 > 메뉴 2 -->
      <ul class="location">
        <li>
          <span>{{ rootOrg.orgNm }}</span>
        </li>
        <template v-for="{ list, index } of menuList" :key="list">
          <li>
            <span>{{ list[index].title }}</span>
          </li>
        </template>
      </ul>
      <div class="util-wrap">
        <ul class="meuns">
          <li>
            <a href="javascript:void(0);">
              <i class="person"><span class="sr-only">유저 아이콘</span></i>
              <span>{{ rootOrg.orgNm }}</span>
            </a>
          </li>
          <template v-for="org in orgList" :key="org">
            <li>
              <a href="javascript:void(0);">
                <span>{{ org.orgNm }}</span>
              </a>
            </li>
          </template>
          <!-- 
          <li>
            <a href="javascript:void(0);">
              <i class="person"><span class="sr-only">유저 아이콘</span></i>
              <span>{{ userInfo.prntOrgNm }}</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">{{ userInfo.orgNm }}</a>
          </li>
           -->
          <li>
            <a href="javascript:void(0);">{{ userInfo.jbdtyNm }}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{ userInfo.userNm }} {{ userInfo.jbgrNm }}</a>
          </li>
        </ul>

        <div class="btns">
          <button type="button" class="confirm" @click="openSidebar">
            알림<span class="count">{{ badgeCount }}</span>
          </button>
          <button type="button" class="setting" @click="sse()">설정</button>
          <button type="button" class="logout" @click="logout()">로그아웃</button>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import store from '@/store';

import { computed, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import login from '@/api/login.js';
export default {
  name: 'AppHeader',
  data() {
    return {
      //userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
      userInfo: store.getters.getUserInfo ? store.getters.getUserInfo : { userNm: '홍길동', jbgrNm: '사원' },
      user: {},
    };
  },
  setup() {
    const store = useStore();

    const state = reactive({
      menuList: store.getters.getMyMenuList,
      rootOrg: store.getters.getRootOrg,
      orgList: store.getters.getOrgList,
    });

    const route = useRoute();
    const router = useRouter();

    const orgList = store.getters.getUserInfo ? store.getters.getUserInfo.orgList : [];

    console.log('header route:', route, ', router:', router);

    // Computed
    const badgeCount = computed(() => store.getters.getBadgeCount);

    // Methods
    const openSidebar = () => {
      store.commit('setOpenSidebar');
    };
    /*
    const eventSource = new EventSource('http://localhost:8010/com/Message/subscribe');

      eventSource.onmessage = event => {
        console.log(event);
        const data = JSON.parse(event.data);
        console.log(data.message);
      }
      eventSource.addEventListener("haha", function(event){
        console.log(event);
      })

      eventSource.onerror = error => {
        eventSource.close();
      }
*/

    // Hooks
    onMounted(() => {});

    return {
      ...toRefs(state),
      openSidebar,
      badgeCount,
    };
  },

  methods: {
    async sse() {
      const eventSource = new EventSource('http://localhost:8010/com/Message/subscribe');

      eventSource.onmessage = (event) => {
        console.log(event);
        const data = JSON.parse(event.data);
        console.log(data.message);
      };
      eventSource.addEventListener('haha', function (event) {
        console.log(event);
      });

      eventSource.onerror = (error) => {
        eventSource.close();
      };
    },

    async logout() {
      store.commit('reset');
      //this.$store.commit('reset');
      //store.getters.init;
      //window.localStorage.clear();
      this.$router.push('/login');
    },
    async getTtl() {
      console.log('ttl');
      const now = new Date();

      alert(store.getters.getTtl + '\n' + now.getTime());
      return await this.getUserInfo();
    },
    async getUserInfo() {
      const userData = await login.getUserInfo('/com/Auth', '25052408');

      if (userData.data.data !== null) {
        const userInfo = userData.data.data;
        console.log(userInfo);
        //localStorage.setItem("userInfo", JSON.stringify(userInfo));
        //this.$store.commit('setUserInfo', userInfo);
        //return await this.getMenus();
        //this.$router.push("/");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.location {
  li:last-of-type {
    color: #53fffd;
  }
}
</style>
