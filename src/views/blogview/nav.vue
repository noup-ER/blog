<template>
  <div class="nav">
    <div class="titleBar">
      <div class="nav_icon" v-if="mobile" @click="showLinksList = !showLinksList">
        <span class="icon_span---1" :class="{'icon_ts_span---1':showLinksList}"></span>
        <span class="icon_span---2" :class="{'icon_ts_span---2':showLinksList}"></span>
        <span class="icon_span---3" :class="{'icon_ts_span---3':showLinksList}"></span>
      </div>
      <span class="blogName">林兆隆的博客</span>
      <div class="linksBar" v-if="!mobile" @click="changePage">
        <span class="link_span" v-for="item in ['Home','计算机知识','经历感悟','关于','Github']" :key="item"
              :id="'link1-'+item"
           :class="{'chosen_a':item === $route.name && item !=='Github'}">
          <span v-if="item !== 'Github'" :id="'link1-'+item">{{item}}</span>
          <a class="Github_a" target="_blank" href="https://github.com/noup-ER?tab=repositories" v-else>{{item}}<svg class="Github_svg" viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <path d="M790.536784 923.653571 77.292364 923.653571 77.292364 228.828662 625.784486 228.828662
            625.784486 264.644379 113.108081 264.644379 113.108081 887.837854 753.697761 887.837854 753.697761
            410.977165 790.536784 410.977165Z" ></path>
            <path d="M904.925691 115.801844l25.885344 25.885344-400.116482 400.116482-25.885344-25.885344
            400.116482-400.116482Z"></path>
            <path d="M932.909375 340.16233 896.369158 338.016457 908.096247 138.5311
          708.61089 150.258189 706.465017 113.717971 947.06784 99.559507Z"></path></svg></a>
        </span>
      </div>
    </div>
    <transition name="links_ts">
      <div class="links_container" :class="{'other':!mobile}"
           v-show="(showLinksList&&mobile) || (/计算机知识|经历感悟/.test($route.name) && !mobile)">
        <ul class="links_ul" @click="changePage" v-if="mobile">
          <li v-for="item in ['Home','计算机知识','经历感悟','关于','Github']"
              :key="item" class="link_li" :id="'link2-'+item"
              :class="{'link_chosen_li':item === $route.name && item !=='Github'}">
            <span :id="'link2-'+item" v-if="item !== 'Github'">{{item}}</span>
            <a class="Github_a" target="_blank" href="https://github.com/noup-ER?tab=repositories" v-else>{{item}}<svg class="Github_svg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
              <path d="M790.536784 923.653571 77.292364 923.653571 77.292364 228.828662 625.784486 228.828662
            625.784486 264.644379 113.108081 264.644379 113.108081 887.837854 753.697761 887.837854 753.697761
            410.977165 790.536784 410.977165Z" ></path>
              <path d="M904.925691 115.801844l25.885344 25.885344-400.116482 400.116482-25.885344-25.885344
            400.116482-400.116482Z"></path>
              <path d="M932.909375 340.16233 896.369158 338.016457 908.096247 138.5311
          708.61089 150.258189 706.465017 113.717971 947.06784 99.559507Z"></path></svg></a>
          </li>
        </ul>
        <catalogue style="margin-top: 1rem" :classify_one="getRouteName"></catalogue>
      </div>
    </transition>
    <div class="sider_mask" v-if="showLinksList && mobile" @click="showLinksList = !showLinksList"></div>
  </div>
</template>

<script>
import catalogue from "@/components/catalogue";

export default {
  name: "nav",
  components:{
    catalogue
  },
  data(){
    return {
      windowWidth: 0,
      showLinksList:false
    }
  },
  methods:{
    changeLayout(){
      this.windowWidth = window.innerWidth;
      this.showLinksList = (window.innerWidth >= 700)?true:this.showLinksList;
    },
    init(){
      this.windowWidth = window.innerWidth;
      window.addEventListener("resize",this.changeLayout)
      this.showLinksList = this.windowWidth >= 700?true:false
    },
    changePage(e){
      if(!(/^link/.test(e.target.id))){
        return;
      }
      let next_page = e.target.id.split("-")[1];
      if(next_page === this.$route.name)return;
      switch (next_page){
        case "Home":
          this.$router.push("/Home");
          break;
        case "计算机知识":
          this.$router.push("/computerknowledge");
          break
        case "经历感悟":
          this.$router.push("/expriences");
          break;
        case "关于":
          this.$router.push("/about");
          break;
      }
    }
  },
  computed:{
    getRouteName(){
      return this.$route.path.slice(1)
    },
    mobile(){
      return this.windowWidth < 700;
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped lang="scss">

$titleBar_border_bottom: 1px solid rgba(240,240,240,1);
$link_border_bottom: 2px solid cornflowerblue;
$icon_color: #5c2223;

.nav{
  @include size(100%,3.6rem);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;

  .titleBar{
    @include size(100%,100%);
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-bottom: $titleBar_border_bottom;
    line-height: 3.6rem;
    padding-left: 20px;
    padding-right: 20px;
    background-color: white;
    position: relative;
    z-index: 51;

    .nav_icon{
      @include size(1.8rem,1.6rem);
      margin-top: 1rem;
      cursor: pointer;
      font-size: 0.9rem;
      position: relative;

      .icon_span---1{
        @include size(100%,0.25rem);
        display: block;
        position: absolute;
        background-color: $icon_color;
        border-radius: 5px;
        top:0;
        transition: all .2s linear;
      }

      .icon_ts_span---1{
        top: 0.6775rem;
        transform: rotate(45deg);
      }


      .icon_span---2{
        @extend .icon_span---1;
        top: 0.6775rem;
      }

      .icon_ts_span---2{
        transform: translateX(-100%);
        opacity: 0;
      }

      .icon_span---3{
        @extend .icon_span---1;
        top: 1.35rem;
      }

      .icon_ts_span---3{
        top: 0.6775rem;
        transform: rotate(-45deg);
      }
    }

    .blogName{
      font-size: 1.3rem;
      font-weight: bold;
    }

    .linksBar{
      @include size(400px,100%);
      display: flex;
      justify-content: space-around;

      .link_span{
        @include size(auto,50%);
        line-height: 1.8rem;
        color: black;
        text-decoration: none;
        margin-top: 0.9rem;
        cursor: pointer;
        position: relative;

        .Github_a{
          color: black;
          text-decoration: none;

          .Github_svg{
            height: 1rem;
            width: 1.2rem;
          }
        }
      }

      .link_span:hover{
        border-bottom: $link_border_bottom;
      }

      .link_span:nth-child(5):hover{
        border-bottom: none;
      }

      .chosen_a{
        border-bottom: $link_border_bottom;
      }
    }
  }

  .links_container{
    @include size(50%,100%);
    border-right: 1px solid beige;
    overflow: auto;
    z-index: 49;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    padding-top: 3.6rem;

    .links_ul{
      @include size(100%,auto);
      padding-bottom: 1rem;
      border-bottom: 1px solid #eaecef;

      .link_li{
        @include size(100%,auto);
        line-height: 1.2rem;
        padding: 0.5rem 1rem;
        font-weight: bold;
        cursor: pointer;
        word-break: break-all;
        font-size: 1rem;

        .Github_a{
          color: black;
          text-decoration: none;

          .Github_svg{
            height: 1rem;
            width: 1.2rem;
          }
        }
      }

      .link_li:hover{
        color: cornflowerblue;
      }

      .link_li:nth-child(5){
        color: black;
      }

      .link_chosen_li{
        color: cornflowerblue;
      }
    }
  }

  .other{
    @include size(20rem,100%)
  }

  .links_container::-webkit-scrollbar{
    width: 7px;
  }

  .links_container::-webkit-scrollbar-thumb{
    background-color: coral;
  }

  .sider_mask{
    @include size(100%,100%);
    position: fixed;
    background-color: transparent;
    z-index: 48;
  }
}

.links_ts-enter,.links_ts-leave-to{
  transform: translateX(-100%);
}
.links_ts-enter-active,.links_ts-leave-active{
  transition: all .2s linear;
}
</style>
