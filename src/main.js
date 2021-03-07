import "core-js/stable";
import Vue from "vue";
import App from "./App";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./assets/icons/icons.js";
import { VuePlugin } from "vuera";

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.use(require("vue-script2"));
Vue.use(VuePlugin);
Vue.prototype.$log = console.log.bind(console);

new Vue({
  el: "#app",
  router,
  icons,
  template: "<App/>",
  components: {
    App,
  },
});
