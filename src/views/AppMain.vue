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
            <div class="ow-content" :class="{ 'pr-3': openLeft }">
              <app-article v-show="left.show">
                <the-action-plan style="flex: 7"></the-action-plan>
                <the-approval style="flex: 3"></the-approval>
              </app-article>
            </div>
            <!-- Right -->
            <div class="ow-content" :class="{ 'pl-3': openLeft }">
              <app-article>
                <router-view></router-view>
              </app-article>
            </div>
          </app-section>
        </main>
      </div>
    </div>
  </div>
  <app-footer></app-footer>
  <app-aside ref="aside"></app-aside>
  <app-multiple-opener v-if="name" ref="opener"></app-multiple-opener>
  <ow-dialog ref="dialog"></ow-dialog>
  <ow-spinner></ow-spinner>
</template>
<script>
import { computed, ref, provide, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

import AppHeader from '@/components/AppHeader';
import AppNav from '@/components/AppNav';
import AppSection from '@/components/AppSection';
import AppArticle from '@/components/AppArticle';
import AppFooter from '@/components/AppFooter';
import AppAside from '@/components/AppAside';
import AppMultipleOpener from '@/components/AppMultipleOpener';

import TheActionPlan from '@@/tsk/components/TheActionPlan';
import TheApproval from '@@/eap/components/TheApproval';

import { app } from '@/main';

export default {
  components: {
    AppHeader,
    AppNav,
    AppSection,
    AppArticle,
    AppFooter,
    AppAside,
    AppMultipleOpener,
    TheActionPlan,
    TheApproval,
  },
  props: {
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

    const { t } = useI18n();

    const dialog = ref(null);

    const acceptButtonText = t('dialog.button.accept');
    const cancelButtonText = t('dialog.button.cancel');

    const $dialog = {
      alert: (message, options = {}) => {
        return dialog.value.open(
          _.assign(
            { type: 'alert', message },
            {
              acceptButtonText,
              cancelButtonText,
            },
            options
          )
        );
      },
      confirm: (message, options = {}) => {
        return dialog.value.open(
          _.assign(
            { type: 'confirm', message },
            {
              acceptButtonText,
              cancelButtonText,
            },
            options
          )
        );
      },
    };

    provide('$dialog', (app.config.globalProperties.$dialog = $dialog));

    return {
      dialog,
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
.ow-container {
  .ow-content {
    --bs-gutter: 6px;
  }
}
.content_body {
  border: none !important;
}
</style>
