<template>
  <div class="article">
    <div :class="{'all1':windowWidth>=700,'all2':windowWidth<700}" v-if="article.time !== ''">
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
    <div :class="{'all1':windowWidth>=700,'all2':windowWidth<700}" v-if="article.time === ''">
      hello world
    </div>
  </div>
</template>

<script>
import catalogue from "@/components/catalogue";
import {instance} from "../../api/instance";
// import {showCodeLines,addStyles} from "@/plugins/show-code-lines"
import hljs from "highlight.js"
import "highlight.js/styles/agate.css"
import {hln} from "@/utils/highlightjs-line-numbers.js"

hln(window,document,hljs);

export default {
  name: "article",
  components:{
    catalogue
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
    require("highlightjs-line-numbers.js")
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
        instance({
          url:"/getArticleById",
          method:"get",
          params:{
            id:newvalue
          }
        }).then(res=>{
          if(res.data.code === 200){
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
          }else{
            this.clearArticle();
          }
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
    padding-left: 27rem;
    padding-right: 7rem;
    overflow: auto;
    transition: $usual_transition;
  }

  .all2{
    @include size(100%,100%);
    padding-left: 2rem;
    padding-right: 2rem;
    transition: $usual_transition;
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

</style>
