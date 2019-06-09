import Vue from 'vue';
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/";
import store from "./store";
import "./plugins/helper";
import axios from "axios";
// import "font-awesome/css/font-awesome.css";

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  // axios,
  render: h => h(App),
}).$mount('#app')
