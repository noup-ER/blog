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
import svgElements from "@/components/svg";
import "@/assets/scss/editor.scss";

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

body{
  overflow: hidden;
}

.router_ts-enter-active{
  animation: router-enter .3s;
  position: absolute;
}
.router_ts-leave-active{
  animation: router-enter .3s reverse;
  position: absolute;
}

@keyframes router-enter {
  from{
    opacity: 0;
    transform: translateY(20%);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
}



table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
table td, table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  height: 2rem;
  text-align: center;
  vertical-align: middle;
  word-break: break-word;
}


.hljs-ln{
  border: none;
  text-align: left;
}
.hljs-ln-line{
  border: none;
  text-align: left;
}

</style>
