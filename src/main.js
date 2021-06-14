import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "tailwindcss/tailwind.css";
import "@/assets/scss/global.scss";

import "@/plugins/vue2-hammer";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
