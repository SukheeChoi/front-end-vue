<template>
  <header class="header">
    <div class="info-area">
      <router-link :to="{ name: 'main' }">
        <h1 class="logo">OW OSSTEM</h1>
      </router-link>

      <!-- TODO Breadcrumb, 위치기반, e.g. 본부명 > 메뉴 1 > 메뉴 2 -->
      <ul class="location">
        <li><span>본부명</span></li>
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
              <span>{{ userInfo.prntOrgNm }}</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">{{ userInfo.orgNm }}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{ userInfo.userNm }} {{ userInfo.jbgrNm }}</a>
          </li>
        </ul>

        <div class="btns">
          <button type="button" class="confirm" @click="openSidebar">
            알림<span class="count">{{ badgeCount }}</span>
          </button>
          <button type="button" class="setting">설정</button>
          <button type="button" class="logout">로그아웃</button>
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

export default {
  name: 'AppHeader',
  data() {
    return {
      //userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
      userInfo: store.state.login.userInfo,
      user: {},
    };
  },
  setup() {
    const store = useStore();

    const state = reactive({
      menuList: store.getters.getMenuList,
    });

    const route = useRoute();
    const router = useRouter();

    console.log('header route:', route, ', router:', router);

    // Computed
    const badgeCount = computed(() => store.getters.getBadgeCount);

    // Methods
    const openSidebar = () => {
      store.commit('setOpenSidebar');
    };

    // Hooks
    onMounted(() => {});

    return {
      ...toRefs(state),
      openSidebar,
      badgeCount,
    };
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.location {
  li:last-of-type {
    color: #53fffd;
  }
}
</style>
