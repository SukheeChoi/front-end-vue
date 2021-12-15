import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/routes';
import store from '@/store';

import BootStrapVue from 'bootstrap-vue-3';

import mixin from '@/mixins';

const app = createApp(App);

app.use(router);
app.use(store);

app.use(BootStrapVue);

app.mixin(mixin);

app.mount('#app');
