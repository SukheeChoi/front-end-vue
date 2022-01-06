import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/routes';
import store from '@/store';
import i18n from '@/locales';

import BootStrapVue from 'bootstrap-vue-3';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import '@grapecity/wijmo.styles/wijmo.css';
import { registerCore } from '@grapecity/wijmo.vue2.core';
import { registerInput } from '@grapecity/wijmo.vue2.input';
import { registerGrid } from '@grapecity/wijmo.vue2.grid';
import { registerGridDetail } from '@grapecity/wijmo.vue2.grid.detail';
import { registerGridFilter } from '@grapecity/wijmo.vue2.grid.filter';
import { registerGridGrouppanel } from '@grapecity/wijmo.vue2.grid.grouppanel';
import { registerNav } from '@grapecity/wijmo.vue2.nav';

import { registerOwComponents, registerOwDialog } from '@/components/common';

import mixin from '@/mixins';
import { setLicenseKey } from '@grapecity/wijmo';

setLicenseKey(process.env.VUE_APP_WIJMO_LICENSE_KEY);

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.use(BootStrapVue);

registerCore(app);
registerInput(app);
registerGrid(app);
registerGridDetail(app);
registerGridFilter(app);
registerGridGrouppanel(app);
registerNav(app);

registerOwComponents(app);
registerOwDialog(app);

app.mixin(mixin);

app.mount('#app');
