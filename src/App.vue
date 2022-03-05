<template>
  <div id="app">
    <navigation></navigation>
    <transition name="router_ts">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import navigation from "@/views/blogview/nav";

export default {
  name: 'App',
  components:{
    navigation
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}

html,body{
  font-size: 100%;
}

#app{
  position: relative;
}

.router_ts-enter,.router_ts-leave-to{
  opacity: 0;
  transform: translateY(20%);
  width: 100%;
}
.router_ts-enter-active,.router_ts-leave-active{
  transition: all .3s ease-out;
  position: absolute;
}

</style>
