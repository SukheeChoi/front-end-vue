<template>
  <nav>
    <template v-for="myMenu in myMenuList" :key="myMenu">
      <b-tabs class="ow-tabs" v-model="myMenu.index">
        <b-tab
          v-for="{ title, name } in myMenu.list"
          :key="name"
          :title="title"
          @click="$router.push({ name })"
        >
          <template v-if="toggle">
            <div class="ow-tabs-toggle">
              <button class="ow-btn type-icon arrow circle"><i class="triangle top"></i><span class="sr-only">아이콘</span></button>
            </div>
          </template>
        </b-tab>
      </b-tabs>
    </template>
  </nav>
</template>
<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const MenuList = [
  { title: '메인', name: 'main' },
  {
    title: '공통관리',
    name: 'com',
    children: [
      {
        title: '배치관리',
        name: 'COMBT',
        children: [
          { title: '배치작업', name: 'COMBT001' },
          { title: '배치결과', name: 'COMBT002' },
          { title: '배치변경이력', name: 'COMBT003' },
        ],
      },
      {
        title: '권한관리',
        name: 'COMAU',
        children: [
          { title: '사용자관리', name: 'COMAU001' },
          { title: '협력/도급직원 관리', name: 'COMAU002' },
          { title: '업무그룹관리', name: 'COMAU003' },
          { title: '부서별 업무그룹관리', name: 'COMAU004' },
          { title: '화면관리', name: 'COMAU005' },
          { title: '메뉴관리', name: 'COMAU006' },
          { title: '업무그룹별 메뉴관리', name: 'COMAU007' },
          { title: '개인별 업무그룹 관리', name: 'COMAU008' },
          { title: '부서별 메인화면 관리', name: 'COMAU009' },
          { title: '부서별 Dashboard 관리', name: 'COMAU010' },
        ],
      },
      {
        title: '데이터표준',
        name: 'COMST',
        children: [
          { title: '표준단어', name: 'COMST001' },
          { title: '금칙어', name: 'COMST002' },
          { title: '표준용어', name: 'COMST003' },
          { title: '표준도메인', name: 'COMST004' },
        ],
      },
      {
        title: '보고서',
        name: 'COMRP',
        children: [
          { title: '사용자로그인이력', name: 'COMRP001' },
          { title: '화면접속이력', name: 'COMRP002' },
          { title: '엑셀다운로드이력', name: 'COMRP003' },
        ],
      },
      {
        title: '설정',
        name: 'COMCF',
        children: [
          { title: '언어코드', name: 'COMCF001' },
          { title: '타임존', name: 'COMCF002' },
          { title: '통화코드', name: 'COMCF003' },
          { title: '메세지소스', name: 'COMCF004' },
          { title: '공통코드', name: 'COMCF005' },
          { title: '템플릿관리', name: 'COMCF006' },
          { title: '시스템설정', name: 'COMCF007' },
          { title: '비밀번호변경', name: 'COMCF008' },
        ],
      },
      {
        title: '인터페이스',
        name: 'COMIF',
        children: [
          { title: '인터페이스 등록', name: 'COMIF001' },
          { title: '인터페이스 현황', name: 'COMIF002' },
        ],
      },
      {
        title: '개인화 설정',
        name: 'COMPE',
        children: [
          { title: '개인정보설정', name: 'COMPE001' },
          { title: '로그인 비밀번호 설정', name: 'COMPE002' },
          { title: '결재 비밀번호 설정', name: 'COMPE003' },
          { title: '부재 설정', name: 'COMPE004' },
          { title: '알림 설정', name: 'COMPE005' },
        ],
      },
    ],
  },
];

export default {
  name: 'AppNav',
  data() {
    return {
      toggle: false,
    }
  },
  components: {},
  setup() {
    const store = useStore();

    // const menuList = store.getters.getMenuList;

    const route = useRoute();
    const currentRouteName = computed(() => route.name);

    const myMenuList = ref([]);

    const compose = (list, name, init = true) => {
      if (init) {
        myMenuList.value.splice(0);
      }
      let index = 0;
      for (const menu of list) {
        const matched = menu.name === name;
        if (matched || (menu.children && compose(menu.children, name, false))) {
          return myMenuList.value.unshift({ list, index: index }) > 0;
        }
        index += 1;
      }
      return false;
    };

    watch(currentRouteName, (name) => compose(MenuList, name), {
      immediate: true,
    });

    onMounted(() => {
      // 현재 세 줄 이상의 메뉴가 구성된 경우 펼침과 닫힘 버튼을 추가한다.
      console.log();
    });

    return {
      myMenuList,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-tabs {
  position: relative;
  // &:last-child::after {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 10px;
  //   height: 10px;
  //   background-color: red;
  // }
  .ow-tabs-toggle {
    position: absolute;
    bottom: 4px;
    left: -7px;
  }
}
</style>
