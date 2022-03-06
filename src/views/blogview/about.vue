<template>
  <div class="about">
    <div class="aboutContent">
      <h1>关于</h1>
      <p>本站模仿vuepress框架，使用vuejs+elementui搭建</p>
      <p>许较多不足之处，路漫漫其修远兮，请多指教</p>
      <p>联系方式:759270724(QQ) LZLlivein1990(WX)</p>
      <p class="endBar">Writer:林兆隆</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "about"
}
</script>

<style scoped lang="scss">
.about{
  @include size(100%,100vh);
  padding-top: 3.6rem;
  display: flex;
  justify-content: center;
  word-break: break-all;

  .aboutContent{
    padding: 2rem;

    h1{
      margin-bottom: 1rem;
    }

    p{
      line-height: 3rem;
    }

    .endBar{
      margin-top: 2rem;
      font-size: 0.8rem;
      color: #4e6e8e;
    }
  }
}
</style>
