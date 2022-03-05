<template>
  <div class="test">
    <div class="box1"></div>
  </div>
</template>

<script>

export default {
  name: "test",
}
</script>

<style scoped lang="scss">
  .test{
    @include size(100%,100%);
    padding-top: 3.6rem;

    .box1{
      background-color: blue;
      width: 100px;
      height: 100px;
    }
  }
</style>
