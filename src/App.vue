<template>
  <div id="app">
    <navigation></navigation>
    <transition name="router_ts">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <svgElements></svgElements>
  </div>
</template>

<script>
import navigation from "@/views/blogview/nav";
import svgElements from "@/components/svg"

export default {
  name: 'App',
  components:{
    navigation,
    svgElements
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

table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
table td, table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  height: 2rem;
}

.hljs-ln{
  border: none;
}
.hljs-ln-line{
  border: none;
}

</style>
