<template>
  <div class="catalogue" @click="changeList">
    <ul v-for="item in classify_two_list" :key="item">
      <li class="kindName_li" :id="'list-'+item">{{item}}</li>
      <div v-if="childrenList[item]!== undefined && childrenList[item].show">
        <li class="each_li"
            v-for="(article,index) in childrenList[item].articles"
            :key="i+index" :id="'article-'+item+'-'+article._id"
            :class="{'chosen_li':current_id === article._id && $route.query.id !== undefined}">{{article.title}}</li>
      </div>
    </ul>
  </div>
</template>

<script>

export default {
  name: "catalogue",
  props:["classify_two_list","childrenList"],
  data(){
    return{
      current_id:""
    }
  },
  methods:{
    //点击文章
    changeList(e){
      try {
        const id = e.target.id;
        if(/^list-/.test(id)){
          const classify_two = id.split("-")[1];
          const classify_one = this.$route.name === 'ck'?"computerknowledge":"expriences";
          this.$emit("changeList",[classify_one,classify_two]);
        }else{
          let temp = id.split("-")[2];
          this.current_id = temp;
          this.$router.replace(
              {
                query:{
                  id:window.btoa(this.current_id)
                }
              }
          ).catch(err=>{})
        }
      }catch (err){
        console.log(err);
      }
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
