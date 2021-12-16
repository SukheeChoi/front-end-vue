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
import { setLicenseKey } from '@grapecity/wijmo'
setLicenseKey('*.osstem.com,617959972562816#B0IOMI7ckJye0ICbuFkI1pjIEJCLi4TPRFUbMFUa0NVOmxGSRRVMhN4NXRjZ62mTtZTSo3mSO3GV6oFNhlWZzxkcShDcHljQ6g7M9AzKsxkSGNUZQ5WM7QmcWp5SnZTMRNmci94VqFDUwgUQxs4ZjNlbz2ENxMXcW5kUvFzYZhWRmZDR9JUWysGSPlXMmticmxURv54cPhWbYdGWhZzKHNHMK36Rr4ETlNjTpNEUHNVa6xWc6wmZ5AXS7IzSPV6LQ9UcwIjTHdmbr3GVy9WT8djQG5mdhlnUEl4dJp7bONmNFtmS8gVWtl6doV4NphmWwVFNPhUerNDaQp5RTRTTzVlQHNFb7VGZTNnZHZGNkhHemhHOGtUY6d5dr9mbadlUpx4TNZ5UtZVbKFzVWdVaZlTOyFFT8wmdwU5QjNjb5YDdKZUeTh4ShxWa4ETOVlmVlNlc8lWNYFVQxEFMB3id78mNWJ4b5cVMhRke9lzZiojITJCLiMTOxMzM5YkNiojIIJCL6gDMyITO9ADO0IicfJye35XX3JSSwIjUiojIDJCLi86bpNnblRHeFBCI4VWZoNFelxmRg2Wbql6ViojIOJyes4nI5kkTRJiOiMkIsIibvl6cuVGd8VEIgIXZ7VWaWRncvBXZSBybtpWaXJiOi8kI1xSfis4N8gkI0IyQiwiIu3Waz9WZ4hXRgAydvJVa4xWdNBybtpWaXJiOi8kI1xSfiQjR6QkI0IyQiwiIu3Waz9WZ4hXRgACUBx4TgAybtpWaXJiOi8kI1xSfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1xSfiUFO7EkI0IyQiwiIu3Waz9WZ4hXRgACdyFGaDxWYpNmbh9WaGBybtpWaXJiOi8kI1tlOiQmcQJCLiETN5MjMxASOwkDMxIDMyIiOiQncDJCLi46bj9SblR7cz3mLqIiOiMXbEJCLigritDonrzIltTonszZhtTqisTKmsLiOiEmTDJCLiYTM8IjN5IzN9kTN9cTM6IiOiQWSiwSfdtlOicGbmJCLiIjdxIDMyIiOiIXZ6JCLlNHbhZ')

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