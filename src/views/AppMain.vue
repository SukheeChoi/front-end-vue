<template>
  <ow-spinner :loading="false"></ow-spinner>
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
import { onMounted, ref, toRefs } from 'vue';
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

    const aside = ref('aside');

    return {
      aside,
    };
  },
};
</script>