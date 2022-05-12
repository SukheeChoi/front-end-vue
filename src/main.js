'use strict';

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/routes';
import store from '@/store';
import i18n from '@/plugins/i18n';
import plugin from '@/plugins';

import BootStrapVue from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import mixin from '@/mixins';

import { setLicenseKey } from '@grapecity/wijmo';
import '@grapecity/wijmo.styles/wijmo.css';

import { registerWijmo, registerOwComponents } from '@/components';

setLicenseKey(process.env.VUE_APP_WIJMO_LICENSE_KEY);

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);
app.use(plugin);

app.use(BootStrapVue);

registerWijmo(app);
registerOwComponents(app);

app.mixin(mixin);

const instance = app.mount('#app');

console.log('instance', instance);

export { app, instance };
