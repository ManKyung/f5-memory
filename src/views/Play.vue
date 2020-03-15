<template>
  <v-ons-page class="game-page">
    <v-ons-toolbar class="white" style="min-height:64px;">
      <div class="left pt-2">
        <v-ons-back-button class="pl-4" style="fill:#fff"></v-ons-back-button>
        
      </div>
      <div class="center text-center fo w-100 fs-20" style="padding-top: 10px;">
        <div v-if="!startVisible" class="text-center fs-20" style="display:inline-block; margin-top:-4px">
          {{time}}
          <span v-if="isTimeLimit">/ {{timeLimit}}</span>
        </div>
      </div>
      <div class="right" style="padding-top: 10px;">
        <v-ons-toolbar-button
          modifier="quiet"
          class="black--text"
          @click="setOption"
        >
          <v-ons-icon icon="ion-ios-more"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <div class="game-background" :style="`background:url('${backgroundImage}'); `">
      <div class="pa-5">
        <div id="board-real">
          <div
            v-for="(item, index) in realBoardItems"
            :key="index"
            class="piece-wrap"
            :style="`width: ${pWidth}px; height: ${pHeight}px;`"
            v-hammer:tap="(event)=> clickPiece(event, item.id, index)"
            v-hammer:press="(event)=> clickPiece(event, item.id, index)"
            v-hammer:pan.start="(event)=> clickPiece(event, item.id, index)"
          >
            <div
              class="piece"
              style="padding:1px;"
            >
              <div class="piece-back" :class="item.cover ? '' : 'on'">
                <img :src="item.src" class="p-image w-100" :class="item.cover ? 'cover' : ''" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <v-ons-modal :visible="startVisible">
      <div class="clear-modal-wrap w-100 on">
        <div class="fs-48">
          <div class="mb-3 fs-24 slide-in-bck-center">LEVEL {{gameLevel}}</div>
          <div class="slide-in-bck-center2">{{goText}}</div>
          <div class=" fs-20 pt-4 slide-in-bck-center">Preview : <strong class="reverse--text">{{previewTime}}s</strong></div>
        </div>
      </div>
    </v-ons-modal>

    <v-ons-modal :visible="timeoverVisible">
      <div class="clear-modal-wrap w-100 on">
        <v-ons-card>
          <div class="black--text fs-24 text-center">Timeover</div>
          <div class="grey--text text-center fs-14 pt-4">Shall we try again?</div>
          <div class="pt-8 px-4">
            <v-ons-button
              class="w-100 text-center fo"
              modifier="quiet"
              v-hammer:tap="setCancel"
              v-hammer:press="setCancel"
              v-hammer:pressup="setCancel"
              v-hammer:pan.start="setCancel"
              style="width:48%"
            >Cancel</v-ons-button>
            <v-ons-button
              class="w-100 text-center fo"
              v-hammer:tap="setRetry"
              v-hammer:press="setRetry"
              v-hammer:pressup="setRetry"
              v-hammer:pan.start="setRetry"
              style="width:48%"
            >Retry</v-ons-button>
          </div>
        </v-ons-card>
      </div>
    </v-ons-modal>

    <v-ons-modal :visible="clearVisible">
      <div class="clear-modal-wrap w-100 on">
        <v-ons-card>
          <div class="black--text fs-24 text-center">STAGE {{gameLevel}} CLEAR</div>
          <div class="grey--text text-center fs-14 pt-4">Congratulations</div>
          <div class="pt-8 px-4">
            <v-ons-button
              class="w-100 text-center fo"
              v-hammer:tap="(e)=> goClose(e)"
              v-hammer:press="(e)=> goClose(e)"
              v-hammer:pressup="(e)=> goClose(e)"
              v-hammer:pan.start="(e)=> goClose(e)"
            >NEXT</v-ons-button>
          </div>
        </v-ons-card>
      </div>
    </v-ons-modal>
    
    <v-ons-action-sheet
      :visible.sync="optionVisible"
      cancelable
      mask-color="rgba(0, 0, 0, 0.7)"
    >
      <v-ons-action-sheet-button class="primary--text" 
              v-hammer:tap="setSound"
              v-hammer:press="setSound"
              v-hammer:pressup="setSound"
              v-hammer:pan.start="setSound">{{$store.state.gameSet.isSound ? 'VIBRATION OFF' : 'VIBRATION ON'}}</v-ons-action-sheet-button>
      <v-ons-action-sheet-button class="primary--text" 
              v-hammer:tap="(e)=> goOption(e, 'clear')"
              v-hammer:press="(e)=> goOption(e, 'clear')"
              v-hammer:pressup="(e)=> goOption(e, 'clear')"
              v-hammer:pan.start="(e)=> goOption(e, 'clear')">CLEAR LIST</v-ons-action-sheet-button>
      <v-ons-action-sheet-button class="primary--text" 
              v-hammer:tap="(e)=> goOption(e, 'more')"
              v-hammer:press="(e)=> goOption(e, 'more')"
              v-hammer:pressup="(e)=> goOption(e, 'more')"
              v-hammer:pan.start="(e)=> goOption(e, 'more')">MORE GAME</v-ons-action-sheet-button>
      <v-ons-action-sheet-button class="primary--text" 
              v-hammer:tap="(e)=> goOption(e, 'review')"
              v-hammer:press="(e)=> goOption(e, 'review')"
              v-hammer:pressup="(e)=> goOption(e, 'review')"
              v-hammer:pan.start="(e)=> goOption(e, 'review')">REVIEW</v-ons-action-sheet-button>
      <v-ons-action-sheet-button class="primary--text" 
              v-hammer:tap="(e)=> goOption(e, 'about')"
              v-hammer:press="(e)=> goOption(e, 'about')"
              v-hammer:pressup="(e)=> goOption(e, 'about')"
              v-hammer:pan.start="(e)=> goOption(e, 'about')">ABOUT</v-ons-action-sheet-button>
      <v-ons-action-sheet-button class="grey--text" @click="optionVisible = false">CLOSE</v-ons-action-sheet-button>
    </v-ons-action-sheet>

  </v-ons-page>
</template>

<script>
import clearListPage from "@/views/List"
import { showInterstitial, prepareInterstitial } from "@/assets/js/admob.js";
export default {
  props: {
    isTimeLimit: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    level: {
      type: Number,
      default: 1
    }
  },
  name: "play-component",
  data() {
    return {
      backgroundImage: "",
      pWidth: "",
      pHeight: "",
      realBoardItems: [],
      selectPieceNumber: -1,
      previousDom: null,
      previousIndex: -1,
      isWait: true,
      clearVisible: false,
      startVisible: false,
      timeoverVisible: false,
      optionVisible: false,
      time: this.previewTime,
      setPreviewTime: null,
      gameParams: {},
      row: 0,
      total: 0,
      goText: '',
      previewTime: 0,
      gameLevel: this.level,
      timeLimit: 0,
      interstitialEvent: ['LOAD_FAIL', 'CLOSE', 'EXIT_APP']
    };
  },
  watch: {
    gameLevel(value) {
      this.setGameInit();
    }
  },
  created() {
    this.setGameInit();
    this.backgroundImage = require(`../assets/img/background/background.jpg`);
  },
  mounted() {
    this.interstitialEvent.forEach((v) => {
      document.addEventListener(`admob.interstitial.events.${v}`, this.setEventListener)
    })
  },
  destroyed(){
    this.interstitialEvent.forEach((v) => {
      document.addEventListener(`admob.interstitial.events.${v}`, this.setEventListener)
    })
  },
  methods: {
    setEventListener(){
      this.goText = 'READY';
      this.gameLevel += 1;
      prepareInterstitial();
    },
    setGameInit() {
      this.realBoardItems = [];
      if(this.gameLevel > 100) {
        this.gameLevel = this.gameLevel % 100;
      }
      this.gameParams = this.$store.state.gameSet.stage[this.gameLevel];

      this.time = this.previewTime = this.gameParams.previewTime;
      this.row = this.gameParams.row;
      this.total = this.gameParams.total;
      this.timeLimit = this.gameParams.timeLimit;

      this.startVisible = true;

      this.goText = 'READY';
      setTimeout(() => {
        this.goText = 'GO';
      }, 1600)
      setTimeout(() => {
        this.goStart();
      }, 3200)
    },
    goOption(e, title){
      if (e.type === "tap" || e.type === "pressup" || e.type === "panstart") {
        if(title === 'clear') {
          this.optionVisible = false;
          this.$emit("push-page", {
            ...clearListPage,
            onsNavigatorProps: {}
          });
        } else if(title === 'more'){
          location.href = 'https://play.google.com/store/apps/developer?id=F5+Game';
        } else if(title === 'review'){
          location.href = 'https://play.google.com/store/apps/details?id=com.f5game.memory';
        } else if(title === 'about'){
          location.href = 'https://f5game.co.kr/home';
        }
      }
    },
    setOption(){
      this.optionVisible = true;
    },
    setSound(e) {
      if (e.type === "tap" || e.type === "pressup" || e.type === "panstart") {
        this.$store.commit(
          "gameSet/setSound",
          !this.$store.state.gameSet.isSound
        );
        this.$store.commit(
          "gameSet/setVibrate",
          !this.$store.state.gameSet.isVibration
        );
      }
    },
    setCancel(e){
      if (e.type === "tap" || e.type === "pressup" || e.type === "panstart") {
        this.isWait = true;
        this.timeoverVisible = false;
      }
    },
    setRetry(e) {
      if (e.type === "tap" || e.type === "pressup" || e.type === "panstart") {
        this.timeoverVisible = false;
        this.setGameInit();
      }
    },
    setPreview() {
      this.setPreviewTime = setInterval(() => {
        this.time -= 1;
      }, 1000);
      setTimeout(() => {
        for (const i in this.realBoardItems) {
          this.realBoardItems[i].cover = true;
        }
        this.isWait = false;
        clearInterval(this.setPreviewTime);

        this.setPreviewTime = setInterval(() => {
          this.time += 1;

          if (this.isTimeLimit && this.time === this.timeLimit) {
            setTimeout(() => {
              this.timeoverVisible = true;
              clearInterval(this.setPreviewTime);
            }, 100);
          }
        }, 1000);
      }, this.previewTime * 1000);
    },
    goStart() {
      this.startVisible = false;
      this.setBoard();
      this.setPreview();
    },
    goClose(e) {
      if (e.type === "tap" || e.type === "pressup" || e.type === "panstart") {
   
        this.clearVisible = false;
        this.$store.commit('gameSet/setShowAd')

        if (this.$store.state.gameSet.isShowAd && this.gameLevel > 5) {
          showInterstitial();
        } else {
          this.gameLevel += 1;
        }
      }
    },
    isClear() {
      for (const item of this.realBoardItems) {
        if (item.open === false) {
          return false;
        }
      }
      clearInterval(this.setPreviewTime);
      this.clearVisible = true;
      this.$store.dispatch("gameSet/setGameClear", {
        level: this.gameLevel,
        isTimeLimit: this.isTimeLimit,
        time: this.time
      });
    },
    clickPiece(e, i, index) {
      if (this.isWait) {
        return false;
      }
      let target = e.target;
      if(!target.classList.contains('p-image')){
        target = target.children[0];
        for(let i = 0 ; i < 3 ; i++){
          if(target.classList.contains('p-image')){
            break;
          }
          target = target.children[0];
        }
      }
      if (!target.classList.contains("cover")) {
        if(this.$store.state.gameSet.isVibration){
          navigator.vibrate(300);
        }
        return false;
      } else if (this.selectPieceNumber === -1) {
        this.selectPieceNumber = i;
        this.previousIndex = index;

        this.previousDom = target;
        this.previousDom.classList.remove("cover");
        this.previousDom.parentElement.classList.add("on");
        this.$store.commit(
          "gameSet/setSound",
          this.$store.state.gameSet.isSound
        );
      } else if (this.selectPieceNumber === i) {
        // 같은모양 클릭시

        this.previousDom.classList.remove("cover");
        target.classList.remove("cover");
        this.previousDom.parentElement.classList.add("on");
        target.parentElement.classList.add("on");

        target.classList.add("success");
        this.previousDom.classList.add("success");

        this.realBoardItems[this.previousIndex].open = true;
        this.realBoardItems[index].open = true;

        this.selectPieceNumber = -1;
        this.$store.commit("gameSet/setSuccessSound");

        if (this.isTimeLimit) {
          this.timeLimit += 5;
        }
        
        this.isClear();
      } else if (this.selectPieceNumber !== i) {
        // 다른모양 클릭시
        this.selectPieceNumber = -1;

        target.classList.remove("cover");
        target.parentElement.classList.add("on");

        this.isWait = true;
        this.$store.commit(
          "gameSet/setSound",
          this.$store.state.gameSet.isSound
        );
        if(this.$store.state.gameSet.isVibration){
          navigator.vibrate(300);
        }
        setTimeout(() => {
          target.classList.add("cover");
          target.parentElement.classList.remove("on");
          this.previousDom.classList.add("cover");
          this.previousDom.parentElement.classList.remove("on");
          this.isWait = false;
        }, 300);
      }
    },
    setBoard() {
      let clientWidth = document.body.clientWidth - 40;
      this.pWidth = this.pHeight = clientWidth / this.row;
      this.boardHeight = clientWidth;

      let len = this.total / 2;

      let temp = [];
      let randomArr = [];
      let random = 0;
      while (randomArr.length !== 25) {
        random = this.makeRandom(0, 24);
        if (randomArr.indexOf(random) === -1) {
          randomArr.push(random);
        }
      }
      for (let i = 0; i < len; i++) {
        let ran = randomArr[i];
        let item = {};
        item.id = i;
        item.open = false;
        item.cover = false;
        item.src = require(`../assets/img/piece/${ran}.png`);
        item.style = `width: ${this.pWidth * 0.8}px; height: ${this.pHeight *
          0.8}px; background: url(${require(`../assets/img/piece/${i}.png`)}); background-size:cover;`;
        temp.push(item);
      }
      temp = temp.concat(temp);
      this.realBoardItems = this.shuffle(temp);
    },
    makeRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
  }
};
</script>