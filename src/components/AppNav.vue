<template>
  <nav>
    <template v-for="myMenu in myMenuList" :key="myMenu">
      <b-tabs class="ow-tabs" v-model="myMenu.index">
        <b-tab
          v-for="{ title, name } in myMenu.list"
          :key="name"
          :title="title"
          @click="$router.push({ name })"
        />
      </b-tabs>
    </template>
  </nav>
</template>
<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'AppNav',
  components: {},
  setup() {
    const store = useStore();

    const menuList = store.getters.getMenuList;

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

    watch(currentRouteName, (name) => compose(menuList, name), {
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
}
</style>
