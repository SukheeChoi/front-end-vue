<template>
  <ow-spinner :loading="false"></ow-spinner>
  <div id="main">
    <app-header></app-header>
    <div id="wrap" class="wrap">
      <main class="content">
        <app-nav class="content_tab" />
        <app-section class="content_body">
          <div class="ow-content">
            <div class="ow-flex-wrap size-full">
              <app-article class="size-fix" style="--size: 446px;" v-if="left.show">
                <div class="ow-flex-wrap dir-col size-full">
                  <the-action-plan></the-action-plan>
                  <the-approval></the-approval>
                </div>
              </app-article>
              <app-article>
                <router-view></router-view>
              </app-article>
            </div>
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
