<template>
  <nav>
    <template v-for="(myMenu, level) in myMenuList" :key="myMenu">
      <b-tabs class="ow-tabs" v-if="!myMenu.hide" v-model="myMenu.index">
        <b-tab v-for="{ title, name } in myMenu.list" :key="name" :title="title" @click="$router.push({ name })">
          <template v-if="showCollapse(level)">
            <div class="ow-tabs-toggle" :class="{ fold: isCollapse }">
              <button class="ow-btn type-icon arrow circle" @click="collapse">
                <i class="triangle top"></i>
                <span class="sr-only">아이콘</span>
              </button>
            </div>
          </template>
        </b-tab>
      </b-tabs>
    </template>
  </nav>
</template>
<script>
import { reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import { isMobile } from '@grapecity/wijmo';

import { Menu } from '@/model';

const MenuList2 = [
  Menu.create('메인', 'main'),
  Menu.create('공통관리', 'COMROOT', [
    Menu.create('배치관리', 'COMBT', [
      Menu.create('배치작업', 'COMBT001'),
      Menu.create('배치결과', 'COMBT002'),
      Menu.create('배치변경이력', 'COMBT003'),
    ]),
    Menu.create('권한관리', 'COMAU', [
      Menu.create('사용자관리', 'COMAU001'),
      Menu.create('업무그룹관리', 'COMAU003'),
      Menu.create('부서별 업무그룹관리', 'COMAU004'),
      Menu.create('화면관리', 'COMAU005'),
      Menu.create('메뉴관리', 'COMAU006'),
      Menu.create('업무그룹별 메뉴관리', 'COMAU007'),
      Menu.create('개인별 업무그룹 관리', 'COMAU008'),
      Menu.create('부서별 메인화면 관리', 'COMAU009'),
      Menu.create('부서별 대시보드 관리', 'COMAU010'),
    ]),
    Menu.create('데이터표준', 'COMST', [
      Menu.create('표준단어', 'COMST001'),
      Menu.create('금칙어', 'COMST002'),
      Menu.create('표준용어', 'COMST003'),
      Menu.create('표준도메인', 'COMST004'),
    ]),
    Menu.create('보고서', 'COMRP', [
      Menu.create('사용자로그인이력', 'COMRP001'),
      Menu.create('화면접속이력', 'COMRP002'),
      Menu.create('엑셀다운로드이력', 'COMRP003'),
    ]),
    Menu.create('설정', 'COMCF', [
      Menu.create('언어코드', 'COMCF001'),
      Menu.create('타임존', 'COMCF002'),
      Menu.create('통화코드', 'COMCF003'),
      Menu.create('메세지소스', 'COMCF004'),
      Menu.create('공통코드', 'COMCF005'),
      Menu.create('템플릿관리', 'COMCF006'),
      Menu.create('시스템설정', 'COMCF007'),
    ]),
    Menu.create('인터페이스', 'COMIF', [
      Menu.create('인터페이스 등록', 'COMIF001'),
      Menu.create('인터페이스 현황', 'COMIF002'),
    ]),
    Menu.create('개인화설정', 'COMPE', [
      Menu.create('개인정보설정', 'COMPE001'),
      Menu.create('로그인 비밀번호 설정', 'COMPE002'),
      Menu.create('결재 비밀번호 설정', 'COMPE003'),
      Menu.create('부재 설정', 'COMPE004'),
      Menu.create('알림 설정', 'COMPE005'),
    ]),
  ]),
];

export default {
  name: 'AppNav',
  components: {},
  setup() {
    const store = useStore();

    const screenList = store.getters.getScreenList;

    const state = reactive({
      myMenuList: [],
      isCollapse: true,
    });

    const route = useRoute();

    const compose = (list, name, init = true) => {
      if (init) {
        state.myMenuList.splice(0);
      }
      let index = 0;
      for (const menu of list) {
        const matched = menu.name === name;
        if (matched || (menu.children && compose(menu.children, name, false))) {
          const hide = state.isCollapse && state.myMenuList.length > (isMobile() ? 0 : 1);
          return state.myMenuList.unshift({ list, index, hide }) > 0;
        }
        index += 1;
      }
      return false;
    };

    const showCollapse = (level) => {
      return state.myMenuList.length > 2 && level === state.myMenuList.length - 1;
    };

    const collapse = () => {
      state.isCollapse = !state.isCollapse;
      for (let i = 0, length = state.myMenuList.length - (isMobile() ? 1 : 2); i < length; i += 1) {
        state.myMenuList.at(i).hide = state.isCollapse;
      }
    };

    const titleChanger = () => {
      const last = state.myMenuList.at(-1);
      if (last) {
        const { list, index } = last;
        document.title = `OW OSSTEM | ${list[index].title}`;
      }
    };

    watch(
      () => route.name,
      (name) => {
        let list = screenList;
        if (typeof screenList === 'undefined' || screenList.length === 0) {
          list = MenuList2;
        }
        compose(list, name);
        titleChanger();
        store.commit('setMyMenuList', state.myMenuList);
      },
      { immediate: true }
    );

    return {
      ...toRefs(state),
      showCollapse,
      collapse,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-tabs {
  position: relative;
  .ow-tabs-toggle {
    position: absolute;
    bottom: 4px;
    left: -7px;
    &.fold {
      transform: rotate(180deg);
    }
  }
}
</style>
