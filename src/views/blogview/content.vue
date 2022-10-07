<template>
  <div class="article">
    <div :class="{'all1':windowWidth>=700,'all2':windowWidth<700}" v-if="!showCover" >
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
           v-if="$route.path === '/computerknowledge' && showCover">
        <ckCover></ckCover>
      </div>
    </transition>
    <transition name="hp_ts">
      <div :class="{'all1':windowWidth>=700,'all2':windowWidth<700}"
           v-if="$route.path === '/expriences' && showCover">
          <exCover></exCover>
      </div>
    </transition>
    <vueToTop type="0" right="2rem" v-if="windowWidth >= 700"></vueToTop>
  </div>
</template>

<script>

import catalogue from "@/components/catalogue";
import {getArticleById} from "@/api/live_axios";
//代码高亮
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import "highlight.js/styles/agate.css"
import {hln} from "@/utils/highlightjs-line-numbers.js"

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', html);
hljs.registerLanguage("css",css)

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
    //监听窗口大小
    changeLayout(){
      this.windowWidth = window.innerWidth;
      this.showLinksList = (window.innerWidth >= 700)?false:this.showLinksList;
    },
    //清空文章
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
  computed:{
    showCover(){
      return this.article.time === undefined || this.$route.query.id === undefined;
    }
  },
  activated() {
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize",this.changeLayout);
    if(!hljs.lineNumbersBlock){
      hln(window,document,hljs);
    }
    //防止刷新丢失数据
    setTimeout(()=>{
      let id = this.$route.query.id;
      if(id){
        getArticleById(id).then(res=>{
          this.article = res.data.article;
          this.$nextTick(()=>{
            document.querySelectorAll("pre code").forEach(item=>{
              console.log(item);
              hljs.highlightBlock(item);
              hljs.lineNumbersBlock(item);
            })
            window.scrollTo(0,0)
            this.$forceUpdate();
          })
        }).catch(err=>{
          this.$message({
            type:"error",
            message:err
          })
          this.clearArticle();
        })
      }

    })
  },
  deactivated() {
    this.clearArticle();
    window.removeEventListener("resize",this.changeLayout);
  },
  beforeRouteUpdate(to,from,next){
    let id = to.query.id;
    getArticleById(id).then(res=>{
      this.article = res.data.article;
      this.$nextTick(()=>{
        document.querySelectorAll("pre code").forEach(item=>{
          hljs.highlightBlock(item);
          hljs.lineNumbersBlock(item);
        });
        // 返回顶部
        window.scrollTo(0,0);
        this.$forceUpdate();
      })
    }).catch(err=>{
      this.$message({
        type:"error",
        message:err
      })
      this.clearArticle();
    })
    next();
  }
}
</script>

<style scoped lang="scss">

$usual_transition:all .2s linear;

.article{
  width: 100%;
  padding-top: 3.6rem;


  .all1{
    width: 100%;
    padding-left: 24rem;
    padding-right: 4rem;
    transition: $usual_transition;
    height: calc(100vh - 3.6rem);
    position: relative;
    overflow-y: auto;
  }

  .all2{
    @extend .all1;
    padding-left: 2rem;
    padding-right: 2rem;
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
