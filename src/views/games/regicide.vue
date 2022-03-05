<template>
  <div class="regicide">
    <div class="interim">
      <div class="container">
        <div class="tavern"
             style="display: flex;justify-content: center;flex-direction: column;align-items: center">
          <p>剩余卡牌{{ remainingPool.length }}张</p>
          <img src="@/assets/playing-cards/card-cover.svg" alt="卡牌" style="zoom: 0.5">
        </div>
        <div class="throne">
          <img class="crown_img" src="@/assets/playing-cards/crown.svg" alt="皇冠">
          <div class="kingFrame">
            <img class="king_img" :src="require(`@/assets/playing-cards/${currentKing.suit}/${currentKing.num}.svg`)">
          </div>
          <div class="kingCondition">
            <img src="@/assets/playing-cards/king-sword.svg" alt="攻击">
            <span>{{ currentKing.attack }}</span>
            <img src="@/assets/playing-cards/king-HP.svg" alt="生命值">
            <span>{{ currentKing.HP }}</span>
          </div>
        </div>
        <div class="discardPile"
             style="display: flex;justify-content: center;flex-direction: column;align-items: center">
          <p>弃牌堆{{ aboundedPool.length }}张</p>
          <img src="@/assets/playing-cards/card-cover.svg" alt="卡牌" style="zoom: 0.5">
        </div>
      </div>
<!--      用户-->
      <div class="player" @click="player_click">
        <div class="infoBox"></div>
        <div class="card" :id="'card---'+index" v-for="(item,index) in [0,1,2,3,4,5,6,7]" :key="'card'+index"
             :class="{'cardChosen': item <= handcards.length - 1 && handcards[item].chosen}">
          <img :id="'img---'+index" :src="require(`@/assets/playing-cards/${handcards[item].suit}/${handcards[item].num}.svg`)"
               v-if="item <= handcards.length - 1">
        </div>
        <div class="options">
          <div class="attack" @click="attack">攻击</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "regicide",
  data(){
    return{
      currentKing:{suit:"club",num:11,attack:10,HP:20},
      numberList:[1,2,3,4,5,6,7,8,9,10,11,12,13],
      handcards:[{suit:"club",num:1,chosen:false},{suit:"club",num:2,chosen:false},
        {suit:"club",num:3,chosen:false},{suit:"club",num:4,chosen:false}],
      remainingKings:[],
      remainingPool:[],
      aboundedPool:[]
    }
  },
  methods:{
    init(){
      let temp;
      for(let num of [11,12,13]){
        temp = []
        for(let suit of ["club","dianmond","heart","spade"]){
          temp.push({suit,num})
        }
        this.remainingKings = this.remainingKings.concat(this.$lodash.shuffle(temp));
      }
      this.currentKing = this.remainingKings[0];
      this.currentKing.attack = 10;
      this.currentKing.HP = 20;
      this.remainingKings.splice(0,1);

    },
    attack(){
      this.handcards = this.$lodash.shuffle(this.handcards)
    },
    player_click(e){
      let number = (/---/.test(e.target.id))?Number(e.target.id.split("---")[1]):9;
      if(number <= this.handcards.length - 1){
        let obj = this.handcards[number];
        obj.chosen = !obj.chosen;
        this.handcards.splice(number,1,obj);
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

@mixin size($width,$height){
  width: $width;
  height: $height;
}

.regicide{
  @include size(100%,100%);
  overflow: auto;

  .interim{
    @include size(100%,100%);
    min-height: 600px;
    min-width: 1400px;

    .container{
      @include size(100%,60%);
      display: flex;
      justify-content: space-around;

      .throne{
        @include size(50%,100%);
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .crown_img{
          zoom: 0.7;
        }

        .kingFrame{
          @include size(240px,336px);
          zoom: 0.8;
          border: 10px solid transparent;
          border-radius: 10px;

          .king_img{
            @include size(100%,100%);
          }
        }

        .kingCondition{
          @include size(240px,40px);
          line-height: 40px;
          display: flex;
          justify-content: space-around;

          span{
            margin-left: -30px;
          }
        }
      }
    }



    .player{
      @include size(100%,40%);
      position: relative;
      display: flex;
      justify-content: right;
      align-items: center;
      border: 1px solid black;

      .infoBox{
        @include size(200px,100%);
        border: 1px solid black;
        position: absolute;
        left: 0;
      }

      .card{
        @include size(120px,168px);
        box-sizing: content-box;
        border: 8px solid black;
        border-radius: 10px;
        margin-left: 10px;
        cursor: pointer;

        img{
          @include size(100%,100%);
        }
      }

      .cardChosen{
        border-color: greenyellow;
      }

      .card:hover{
        border-color: aqua;
      }

      .options{
        @include size(120px,168px);
        display: flex;
        justify-content: center;
        align-items: center;

        .attack{
          @include size(60px,30px);
          border: 1px solid black;
          background-color: black;
          color: white;
          text-align: center;
          line-height: 30px;
          font-weight: bold;
          cursor: pointer;
          transition: all .3s linear;
        }
        .attack:hover{
          color: black;
          background-color: white;
        }
      }
    }
  }
}


.regicide::-webkit-scrollbar{
  @include size(5px,100%);
  border-radius: 5px;
}

.regicide::-webkit-scrollbar-track{
  @include size(100%,100%);
  background-color: transparent;
}

.regicide::-webkit-scrollbar-thumb{
  background-color: lightgrey;
  border-radius: 2.5px;
}
</style>
