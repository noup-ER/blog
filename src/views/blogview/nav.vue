<template>
  <div class="nav">
    <div class="titleBar">
<!--      手机右上角标志-->
      <div class="nav_icon" v-if="mobile" @click="showLinksList = !showLinksList">
        <span class="icon_span---1" :class="{'icon_ts_span---1':showLinksList}"></span>
        <span class="icon_span---2" :class="{'icon_ts_span---2':showLinksList}"></span>
        <span class="icon_span---3" :class="{'icon_ts_span---3':showLinksList}"></span>
      </div>
      <span class="blogName">林兆隆的博客</span>
      <div class="linksBar" v-if="!mobile" @click="changePage">
        <span class="link_span" id="home" :class="{'chosen_a':'home' === $route.name}">
          Home
        </span>
        <span class="link_span" id="ck" :class="{'chosen_a':'ck' === $route.name}">
          计算机知识
        </span>
        <span class="link_span" id="ex" :class="{'chosen_a':'ex' === $route.name}">
          经历感悟
        </span>
        <span class="link_span" id="about" :class="{'chosen_a':'about' === $route.name}">
          关于
        </span>
        <a class="Github_a" target="_blank" href="https://github.com/noup-ER?tab=repositories">
          Github
          <svg class="Github_svg" >
            <use href="#Github_svg"></use>
          </svg>
        </a>
      </div>
    </div>
    <transition name="links_ts">
      <div class="links_container" :class="{'other':!mobile}"
           v-show="(showLinksList&&mobile) || (/ck|ex/.test($route.name) && !mobile)">
        <ul class="links_ul" @click="changePage" v-if="mobile">
          <li class="link_li" id="home" :class="{'link_chosen_li':'home' === $route.name}">Home</li>
          <li class="link_li" id="ck" :class="{'link_chosen_li':'ck' === $route.name}">计算机知识</li>
          <li class="link_li" id="ex" :class="{'link_chosen_li':'ex' === $route.name}">经历感悟</li>
          <li class="link_li" id="about" :class="{'link_chosen_li':'about' === $route.name}">关于</li>
          <li class="link_li">
            <a class="Github_a" target="_blank" href="https://github.com/noup-ER?tab=repositories">
              Github
              <svg class="Github_svg" >
                <use href="#Github_svg"></use>
              </svg>
            </a>
          </li>
        </ul>
        <catalogue style="margin-top: 1rem" ref="cata"
                   v-if="/ck|ex/.test($route.name)"
                   :classify_two_list="classify_two_list"
                   :childrenList="childrenList"
                   @changeList="changeList($event,payloads)"></catalogue>
      </div>
    </transition>
    <div class="sider_mask" v-if="showLinksList && mobile" @click="showLinksList = !showLinksList"></div>
  </div>
</template>

<script>
import catalogue from "@/components/catalogue";
import {getClassifyTwoList,getArticleList} from "@/api/live_axios";

export default {
  name: "nav",
  components:{
    catalogue
  },
  data(){
    return {
      windowWidth: 0,
      showLinksList:false,
      classify_two_list:[],
      childrenList:{}
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
    //跳路由
    changePage(e){
      let id = e.target.id;
      switch (id){
        case "home":
          this.$router.push("/Home");
          break;
        case "ck":
          getClassifyTwoList("computerknowledge").then(res=>{
            this.classify_two_list = res.data["classify_two_list"];
            res.data["classify_two_list"].forEach(obj=>{
              this.childrenList[obj] = {
                show:false,
                articles:[]
              }
            })
            this.$router.push("/computerknowledge");
          })
          break
        case "ex":
          getClassifyTwoList("expriences").then(res=>{
            this.classify_two_list = res.data["classify_two_list"];
            res.data["classify_two_list"].forEach(obj=>{
              this.childrenList[obj] = {
                show:false,
                articles:[]
              }
            })
            this.$router.push("/expriences");
          })
          break;
        case "about":
          this.$router.push("/about");
          break;
      }
    },
    changeList(args){
      const classify_one = args[0];
      const classify_two = args[1];
      if(!this.childrenList[classify_two].show){
        getArticleList(classify_one, classify_two).then(res=>{
          this.childrenList[classify_two].articles = res.data["article_list"];
          this.childrenList[classify_two].show = true;
          this.$refs.cata.$forceUpdate();
        })
      }
    }
  },
  computed:{
    mobile(){
      return this.windowWidth < 700;
    }
  },
  created() {
    //解决刷新问题
    setTimeout(()=>{
      switch (this.$route.name){
        case "ck":
          getClassifyTwoList("computerknowledge").then(res=>{
            this.classify_two_list = res.data["classify_two_list"];
            res.data["classify_two_list"].forEach(obj=>{
              this.childrenList[obj] = {
                show:false,
                articles:[]
              }
            })
          });
          break;
        case "ex":
          getClassifyTwoList("expriences").then(res=>{
            this.classify_two_list = res.data["classify_two_list"];
            res.data["classify_two_list"].forEach(obj=>{
              this.childrenList[obj] = {
                show:false,
                articles:[]
              }
            })
          })
          break;
      }
    })
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
  min-width: 200px;

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
        white-space: nowrap;
      }

      .link_span:hover{
        border-bottom: $link_border_bottom;
      }

      .chosen_a{
        border-bottom: $link_border_bottom;
      }

      .Github_a{
        color: black;
        text-decoration: none;

        .Github_svg{
          height: 1rem;
          width: 1.2rem;
        }
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
