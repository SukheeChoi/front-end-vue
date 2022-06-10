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
  ]),
  Menu.create('교육', 'EDUROOT', [
    Menu.create('교육중메뉴', 'TestSub', [
      Menu.create('ABC', 'abc001')
    ])
  ])
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
        document.title = `${list[index].title} | OW OSSTEM`;
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
