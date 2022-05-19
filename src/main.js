import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");

const obj = {
  key1: "value1",
  key2: "value2",
};
