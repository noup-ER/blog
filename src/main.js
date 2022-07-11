import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

import {Message} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';


Vue.component(Message.name,Message)

Vue.prototype.$message = Message;


import vueToTop from 'vue-totop'
Vue.use(vueToTop)


Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

const vue = new Vue({
  render: h => h(App),
  router
})
vue.$mount('#app');

export {
  vue
}


