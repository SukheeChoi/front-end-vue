import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/routes';
import store from '@/store';

import BootStrapVue from 'bootstrap-vue-3';

import '@grapecity/wijmo.styles/wijmo.css';
import { registerCore } from '@grapecity/wijmo.vue2.core';
import { registerInput } from '@grapecity/wijmo.vue2.input';
import { registerGrid } from '@grapecity/wijmo.vue2.grid';
import { registerGridDetail } from '@grapecity/wijmo.vue2.grid.detail';
import { registerGridFilter } from '@grapecity/wijmo.vue2.grid.filter';
import { registerGridGrouppanel } from '@grapecity/wijmo.vue2.grid.grouppanel';
import { registerNav } from '@grapecity/wijmo.vue2.nav';

import mixin from '@/mixins';

const app = createApp(App);

app.use(router);
app.use(store);

app.use(BootStrapVue);

registerCore(app);
registerInput(app);
registerGrid(app);
registerGridDetail(app);
registerGridFilter(app);
registerGridGrouppanel(app);
registerNav(app);

app.mixin(mixin);

app.mount('#app');
