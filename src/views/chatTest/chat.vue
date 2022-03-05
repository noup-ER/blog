<template>
  <div class="chat">
    <div class="message">
      <ul class="content_ul">
        <li class="content_li" v-for="(item,index) in chat_history" :key="'chat' + index">{{item}}</li>
      </ul>
      <textarea class="send_area" placeholder="请输入消息" ref="sendMessage"></textarea>
      <button class="send_random_btn" @click="randomSend">牛牛随机</button>
      <button class="send_btn" @click="send">发送</button>
    </div>
    <div class="infoBox">
      <h4>在线人员列表</h4>
      <ul style="list-style: none">
        <li v-for="item in personList" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  name: "chat",
  data(){
    return{
      personList:[],
      ws:null,
      chat_history:[],
    }
  },
  created() {
    this.ws = new WebSocket(`ws://192.168.1.4:3000?name=${this.$store.state.name}`);
    this.ws.onmessage = this.onMessage;
  },
  destroyed() {
    this.ws.close();
  },
  methods:{
    onMessage(message){
      let data = JSON.parse(message.data)
      if(data.personList){
        this.personList = data.personList;
      }
      if(data.info){
        this.chat_history.push(data.info);
      }
    },
    randomSend(){
      let ls = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
      let ans = [],temp = "";
      while(ans.length < 5){
        temp = ls[Math.floor(Math.random()*13)];
        if(ans.length === 4 && ans.join("") === temp + temp + temp + temp){
          continue;
        }
        ans.push(temp);
      }
      this.ws.send(ans.join(" "))
    },
    send(){
      this.ws.send(this.$refs.sendMessage.value);
      this.$refs.sendMessage.value = "";
    }
  }
}
</script>

<style scoped lang="scss">

.chat{
  width: 100%;
  height: 100%;
  display: flex;

  .message{
    height: 600px;
    width: 60%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;

    .content_ul{
      width: 100%;
      height: 70%;
      overflow-y: scroll;
      border-bottom: 1px solid black;
      list-style: none;
      padding: 10px;
      padding-top: 0;

      .content_li{
        width: 100%;
        height: auto;
        margin-top: 10px;
      }
    }

    .send_area{
      width: 100%;
      height: 25%;
      border-top: aquamarine 10px solid;
      outline: none;
      padding: 5px;
    }

    .send_random_btn{
      width: 30%;
      height: 5%;
    }

    .send_btn{
      width: 30%;
      height: 5%;
      margin-left: 70%;
    }
  }

  .infoBox{
    height: 600px;
    width: 40%;
    border: 1px solid black;
  }
}

</style>
