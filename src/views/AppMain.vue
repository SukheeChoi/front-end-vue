<template>
  <ow-spinner :loading="false"></ow-spinner>
  <div id="main">
    <app-header></app-header>
    <div id="wrap" class="wrap">
      <div class="content">
        <app-nav class="content_tab"></app-nav>
        <main class="content_body">
          <div
            class="ow-container col-2-set"
            :class="{ 'main__article--show-left': hasLeft }"
            style="--size-1: 0; --gap-container: 0"
            ref="container"
          >
            <!-- Left -->
            <div class="ow-content" :class="{ 'pr-2': hasLeft }">
              <app-article
                class="ow-flex-wrap dir-col size-full"
                v-show="left.show"
              >
                <div
                  class="item size-fix"
                  style="--size: 70%; --bg: transparent"
                >
                  <the-action-plan></the-action-plan>
                </div>
                <div class="item">
                  <the-approval></the-approval>
                </div>
              </app-article>
            </div>
            <!-- Right -->
            <div class="ow-content" :class="{ 'pl-2': hasLeft }">
              <app-article class="ow-flex-wrap size-full">
                <div class="item">
                  <router-view></router-view>
                </div>
              </app-article>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
  <app-footer></app-footer>
  <app-aside ref="aside"></app-aside>
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
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import OwSpinner from '@/components/common/OwSpinner';

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
    OwSpinner,
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
  setup(props, context) {
    console.log('setup', props, context);

    const hasLeft = computed(() => props.left.show);

    return {
      hasLeft,
    };
  },
};
</script>
<style lang="scss" scoped>
.main__article--show-left {
  &.ow-container {
    --size-1: 446px !important;
  }
}
</style>
