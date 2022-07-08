import Vue from 'vue'
import Router from 'vue-router'
import router_url from "./router_url";

Vue.use(Router);

//防止重复点击路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

var router = new Router({
  mode: process.env.NODE_ENV === "development"?"hash":"history",
  routes: router_url
})

export default router;





