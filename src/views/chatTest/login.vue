<template>
  <div class="login">
    <input class="username_ipt" ref="username" type="text" placeholder="请设置一个聊天用户名">
    <div class="login_btn" @touchstart = "login">
      进入聊天室
    </div>
  </div>
</template>

<script>



export default {
  name: "login",
  methods:{
    login(){
      this.$store.commit("changeName",this.$refs.username.value);
      this.$router.push("/chat");
    }
  }
}
</script>

<style scoped lang="scss">
.login{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
  background: linear-gradient(45deg,rgba(0,255,128,0.1),rgba(59,255,0,0.61));

  .username_ipt{
    width: 60vw;
    height: 30px;
    outline: none;
  }

  .login_btn{
    margin-top: 10px;
    width: 100px;
    font-size: 16px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border: 1px solid black;
    border-radius:  5px;
    background-color: aquamarine;
  }
}
</style>
