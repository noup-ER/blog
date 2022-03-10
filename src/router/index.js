import Vue from 'vue'
import Router from 'vue-router'
import router_url from "./router_url";


Vue.use(Router);

var router = new Router({
  mode: 'history',
  routes: router_url
})

export default router;





