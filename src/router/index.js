import Vue from 'vue'
import Router from 'vue-router'
import router_url from "./router_url";

Vue.use(Router);


var router = new Router({
  mode: process.env.NODE_ENV === "development"?"hash":"history",
  routes: router_url
})

export default router;





