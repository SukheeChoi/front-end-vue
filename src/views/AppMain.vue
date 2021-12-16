<template>
  <div id="main">
    <app-header></app-header>
    <div id="wrap" class="wrap">
      <main class="content">
        <app-nav></app-nav>
        <app-section>
          <div class="row">
            <app-article class="col fix-left" v-if="left.show">
              <the-action-plan></the-action-plan>
              <the-approval></the-approval>
            </app-article>
            <app-article class="col">
              <router-view></router-view>
            </app-article>
          </div>
        </app-section>
      </main>
      <app-aside></app-aside>
    </div>
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader';
import AppNav from '@/components/AppNav';
import AppSection from '@/components/AppSection';
import AppArticle from '@/components/AppArticle';
import AppAside from '@/components/AppAside';

import TheActionPlan from '@/components/TheActionPlan';
import TheApproval from '@/components/TheApproval';

export default {
  components: {
    AppHeader,
    AppNav,
    AppSection,
    AppArticle,
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
  setup(props, context) {
    console.log('setup', props, context);
  },
  mounted() {
    console.log(this.testProps);
  },
};
</script>
<style lang="scss" scoped>
aside {
  display: none;
}
</style>
<style lang="sass">
@import '@/assets/ow-admin.scss'
</style>
