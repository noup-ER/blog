<template>
  <div>
    <button @click="connect">连接</button>
    <input type="text" v-model="username">
    <button @click="send">传数据</button>
    <button @click="disconnect">断开连接</button>
    <button @click="restart">测试重新连接</button>
  </div>
</template>

<script>
export default {
  name: "test",
  data(){
    return {
      ws: null,
      username: ""
    }
  },
  methods:{
    connect(){
      console.log("连接");
      this.ws = new WebSocket(`ws://localhost:3000?name=${this.username}`);
      this.ws.onopen = ()=>{
        this.ws.send("启动连接")
      }
      this.ws.onclose = ()=>{
        this.ws.send("客户端断开连接")
      }
      this.ws.onmessage = (data)=>{
        console.log("onmessage");
        console.log(data);
      }
    },
    send(){
      console.log("发送");
      this.ws.send(this.username)
    },
    disconnect(){
      console.log("断开连接");
      this.ws.close()
    },
    restart(){
      console.log("重新连接");
      this.ws.open()
    }
  }
}
</script>

<style scoped>

</style>
