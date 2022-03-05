<template>
  <div class="catalogue">
    <ul v-for="item in classify_two_list" :key="item" @click="changeList">
      <li class="kindName_li" :id="'classtitle-'+item">{{item}}</li>
      <li class="each_li" v-if="childrenList[item].show"
          v-for="(article,index) in childrenList[item].articles"
          :key="i+index" :id="'article-'+item+'-'+article._id"
          :class="{'chosen_li':current_id === article._id}">{{article.title}}</li>
    </ul>
  </div>
</template>

<script>
import {instance} from "@/api/instance";
export default {
  name: "catalogue",
  props:["classify_one"],
  data(){
    return{
      classify_two_list:[],
      childrenList:{},
      current_id:""
    }
  },
  methods:{
    //点击文章
    changeList(e){
      const id = e.target.id;
      if(/^classtitle-/.test(id)){
        const classify_two = id.split("-")[1];
        instance({
          url:"/getArticleList",
          methods: "get",
          params:{
            classify_one:this.classify_one,
            classify_two:classify_two
          }
        }).then(res=>{
          this.childrenList[classify_two].articles = res.data.articleList;
          this.childrenList[classify_two].show = true;
          this.$forceUpdate();
        })
      }else{
        let temp = id.split("-")[2];
        this.current_id = temp;
        this.$router.replace(
            {
              query:{
                id:this.current_id
              }
            }
        )
      }
    }
  },
  watch:{
    classify_one:{
      handler:function (newvalue,oldvalue){
        if(newvalue!=="computerknowledge"&&newvalue!=="expriences"){
          this.current_id = "";
          return;
        }
        this.childrenList = {};
        instance({
          url:"/readClassifyTwo",
          params:{
            classify_one:newvalue
          }
        }).then(res=>{
          if(res.data.code === 200){
            this.classify_two_list = res.data["classify_two_list"];
            res.data["classify_two_list"].forEach(obj=>{
              this.childrenList[obj] = {
                show:false,
                articles:[]
              }
            })
          }
        })
      },
      immediate:true
    }
  }
}
</script>

<style scoped lang="scss">

.catalogue{
  .kindName_li{
    line-height: 1.2rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
  }

  .each_li{
    font-size: 1.1rem;
    line-height: 1.2rem;
    padding: 0.5rem 1rem 0.5rem 2rem;
    cursor: pointer;
    border-left: 5px solid transparent;
  }

  .chosen_li{
    color: cornflowerblue;
    border-left: 5px solid cornflowerblue;
  }

  .each_li:hover{
    color: cornflowerblue;
    border-left: 5px solid cornflowerblue;
  }
}
</style>
