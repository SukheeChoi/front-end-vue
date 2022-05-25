import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'

createApp(App).use(store).use(router).mount("#app");

const obj = {
  key1: "value1",
  key2: "value2",
};
