import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import store from "./store"

import {Message} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.component(Message.name,Message)
Vue.prototype.$message = Message;


Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$lodash = require("lodash");


const vue = new Vue({
  render: h => h(App),
  router,
  store
})

vue.$mount('#app');

export {
  vue
}

// Vue.prototype.$axios.interceptors.request.use(function (config){
//   vue.$children[0].$refs.coco.style.display = "none"
//   return config
// },function (error){
//   return Promise.reject("not ok")
// })
// Vue.prototype.$axios.interceptors.response.use(function (config){
//   vue.$children[0].$refs.coco.style.display = "black"
//   return config
// })

