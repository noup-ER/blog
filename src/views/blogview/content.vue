<template>
  <div class="article">
    <div :class="{'all1':windowWidth>=700,'all2':windowWidth<700}" v-if="article.time !== ''" >
      <div class="title">
        <span>{{ article.title }}</span>
      </div>
      <div class="time">
        <span>时间：{{ article.time }}</span>
      </div>
      <hr/>
      <div class="content" ref="content" v-html="article.content"></div>
      <div class="endBar">
        Writer: 林兆隆
      </div>
    </div>
    <transition name="hp_ts">
      <div :class="{'all1':windowWidth>=700,'all2':windowWidth<700}"
           v-if="$route.path === '/computerknowledge' && article.time === ''">
        <ckCover></ckCover>
      </div>
    </transition>
    <transition name="hp_ts">
      <div :class="{'all1':windowWidth>=700,'all2':windowWidth<700}"
           v-if="$route.path === '/expriences' && article.time === ''">
          <exCover></exCover>
      </div>
    </transition>
  </div>
</template>

<script>
import catalogue from "@/components/catalogue";
import {getArticleById} from "@/api/live_axios";
import hljs from "highlight.js"
import "highlight.js/styles/agate.css"
import {hln} from "@/utils/highlightjs-line-numbers.js"
import ckCover from "@/components/ckCover"
import exCover from "@/components/exCover";

export default {
  name: "article",
  components:{
    catalogue,
    ckCover,
    exCover
  },
  data(){
    return{
      article:{
        title:"",
        content:"",
        classify_one:"",
        classify_two:"",
        time:""
      },
      windowWidth:0,
      imgWidth:0,
      test:0
    }
  },
  methods:{
    changeLayout(){
      this.windowWidth = window.innerWidth;
      this.showLinksList = (window.innerWidth >= 700)?false:this.showLinksList;
    },
    clearArticle(){
      this.article = {
        title:"",
        content:"",
        classify_one:"",
        classify_two:"",
        time:""
      }
    }
  },
  activated() {
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize",this.changeLayout);
    if(!hljs.lineNumbersBlock){
      hln(window,document,hljs);
    }
  },
  deactivated() {
    this.clearArticle();
    window.removeEventListener("resize",this.changeLayout);
  },
  computed:{
    getRouteName(){
      return this.$route.path.slice(1)
    },
    getId(){
      return this.$route.query.id;
    }
  },
  watch:{
    getId:{
      handler:function (newvalue,oldvalue){
        if(!newvalue){
          this.clearArticle();
          return;
        }
        getArticleById(newvalue).then(res=>{
          this.article = res.data.article;
          this.$nextTick(()=>{
            document.querySelectorAll("img").forEach(item=>{
              item.style.width = "100%";
            })
            document.querySelectorAll("pre code").forEach(item=>{
              hljs.highlightBlock(item);
              hljs.lineNumbersBlock(item);
            })
          })
          this.$forceUpdate();
        }).catch(err=>{
          this.$message({
            type:"error",
            message:err
          })
          this.clearArticle();
        })
      },
      immediate:true
    }
  }
}
</script>

<style scoped lang="scss">

$usual_transition:all .2s linear;

.article{
  width: 100%;
  padding-top: 3.6rem;

  .all1{
    @include size(100%,100%);
    padding-left: 22rem;
    padding-right: 2rem;
    overflow: auto;
    transition: $usual_transition;
    min-height: calc(100vh - 3.6rem);
  }

  .all2{
    @include size(100%,100%);
    padding-left: 2rem;
    padding-right: 2rem;
    transition: $usual_transition;
    min-height: calc(100vh - 3.6rem);
  }

  .title{
    text-align: center;
    line-height: 4rem;
    font-size: 2rem;
  }

  .time{
    line-height: 3rem;
    text-align: right;
  }

  .content{
    margin-top: 1rem;
    list-style-position:inside;
    word-break: break-all;
    position: relative;
    width: 100%;
  }

  .endBar{
    @include size(100%,5rem);
    line-height: 5rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: #4e6e8e;
  }
}

.hp_ts-enter,.hp_ts-leave-to{
  opacity: 0;
}
.hp_ts-enter-active,.hp_ts-leave-active{
  transition: all 1s linear;
  position: absolute;
}
.hp_ts-enter-to,.hp_ts-leave{
  opacity: 1;
}

</style>
