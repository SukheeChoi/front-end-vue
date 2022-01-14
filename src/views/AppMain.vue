<template>
  <div id="main">
    <app-header></app-header>
    <div id="wrap" class="wrap">
      <div class="content">
        <app-nav class="content_tab"></app-nav>
        <main class="content_body">
          <app-section
            class="ow-container col-2-set"
            :class="{ 'main__article--open-left': openLeft }"
            style="--size-1: 0; --gap-container: 0"
            ref="container"
          >
            <!-- Left -->
            <div class="ow-content" :class="{ 'pr-2': openLeft }" style="--bs-gutter: 6px">
              <app-article class="ow-flex-wrap dir-col size-full" v-show="left.show">
                <div class="item size-fix" style="--size: 70%; --bg: transparent">
                  <the-action-plan></the-action-plan>
                </div>
                <div class="item">
                  <the-approval></the-approval>
                </div>
              </app-article>
            </div>
            <!-- Right -->
            <div class="ow-content" :class="{ 'pl-2': openLeft }" style="--bs-gutter: 6px">
              <app-article class="ow-flex-wrap size-full">
                <div class="item">
                  <router-view></router-view>
                </div>
              </app-article>
            </div>
          </app-section>
        </main>
      </div>
    </div>
  </div>
  <app-footer></app-footer>
  <app-aside ref="aside"></app-aside>

  <ow-spinner></ow-spinner>
</template>
<script>
import AppHeader from '@/components/AppHeader';
import AppNav from '@/components/AppNav';
import AppSection from '@/components/AppSection';
import AppArticle from '@/components/AppArticle';
import AppFooter from '@/components/AppFooter';
import AppAside from '@/components/AppAside';

import TheActionPlan from '@@/tsk/components/TheActionPlan';
import TheApproval from '@@/eap/components/TheApproval';

import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    AppHeader,
    AppNav,
    AppSection,
    AppArticle,
    AppFooter,
    AppAside,
    TheActionPlan,
    TheApproval,
  },
  props: {
    nav: {
      type: Object,
      default: function () {
        return {};
      },
    },
    left: {
      type: Object,
      default: function () {
        return {
          show: false,
        };
      },
    },
    right: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  setup(props) {
    const store = useStore();

    const showLoading = computed(() => store.state.showLoadingImage);

    const openLeft = computed(() => props.left.show);

    return {
      showLoading,
      openLeft,
    };
  },
};
</script>
<style lang="scss" scoped>
.main__article--open-left {
  &.ow-container {
    --size-1: 446px !important;
  }
}
.content_body {
  border: none !important;
}
</style>
