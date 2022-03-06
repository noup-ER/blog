<template>
  <div class="home">
    <div class="interim">
      <img src="@/assets/photos/rose.svg" alt="瓶中玫瑰">
      <span class="counsel">看瓶中流年似水</span>
      <router-link to="/computerknowledge" tag="div">
        <div class="continue">continue</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
}
</script>

<style scoped lang="scss">
@mixin content-center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.home{
  width: 100%;

  .interim{
    @include size(100%,auto);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.6rem 20px 2rem 20px;

    img{
      max-width: 100%;
      max-height: 280px;
    }

    .counsel{
      font-size: 1.6rem;
      color: teal;
    }

    .continue{
      @include size(10rem,3rem);
      margin-top: 1rem;
      color: white;
      background-color: #126bae;
      border-radius: 4px;
      font-size: 1.3rem;
      line-height: 3rem;
      text-align: center;
      cursor: pointer;
      transition: all .2s linear;
    }

    .continue:hover{
      opacity: .7;
    }
  }
}
</style>
