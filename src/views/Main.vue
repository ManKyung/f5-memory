<template>
  
  <v-ons-page class="main-page">

    <div class="background" :style="`background:url(${backgroundImage});height:100%;`"></div>
    <div class="content">
      <div class="content-wrap" :style="`background:url(${logoImage});height:100%; background-size:contain; background-repeat:repeat`">
        <v-ons-card class="text-center pa-5" style="border:2px solid #333; width:80%; background: #f7cff7">
          <div class="pt-7 pb-8"><strong class="fs-24">GAME MODE</strong></div>
          
          <ons-list-item>
            <label class="center" for="switch1">
              TIME LIMIT <span class="ml-1 primary--text">({{ isTimeLimit ? 'on' : 'off' }})</span>
            </label>
            <div class="right">
              <v-ons-switch class="time-switch" input-id="switch1"
                v-model="isTimeLimit"
              >
              </v-ons-switch>
            </div>
          </ons-list-item>
          <v-ons-button class="btn-item fo"
            v-hammer:tap="(e)=> goPage(e, 'play')"
            v-hammer:press="(e)=> goPage(e, 'play')"
            v-hammer:pressup="(e)=> goPage(e, 'play')"
            v-hammer:pan.start="(e)=> goPage(e, 'play')">PLAY</v-ons-button>
        </v-ons-card>
      </div>
    </div>

  </v-ons-page>
</template>

<style>
.content-wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.btn-item {
  border:2px solid #675bc5 !important;
  padding: 5px 0px !important;
  border-radius: 50px !important;
  margin:20px 0 10px 0 !important;
  width:48% !important;
}
.btn-item:active {
  transform: translateY(2px);
  background: #6c5ce7 !important;
}
.list-item__center, .list-item__right {
background-image: none !important;
}
:checked + .switch__toggle {
  box-shadow: inset 0 0 0 2px #6c5ce7 !important;
  background-color: #6c5ce7 !important;
}
</style>

<script>
import playPage from "@/views/Play"
import backgroundImage from '@/assets/img/background/background.jpg';
import logoImage from '@/assets/img/logo.png';
import { showBanner } from "@/assets/js/admob.js";
export default {
  name: 'main-component',
  data(){
    return {
      backgroundImage, 
      logoImage,
      isTimeLimit: false,
      stage: this.$store.state.gameSet.stage,
    }
  },
  mounted(){
    setTimeout(() => {
      showBanner()
    }, 1000)
  },
  methods: {
    goPage(e, gType){
      if(e.type === 'tap' || e.type === 'pressup' || e.type === 'panstart'){
        let params = {};
        let level = 1;

        level = this.isTimeLimit ? this.$store.state.gameSet.limitClear.length + 1 : this.$store.state.gameSet.noLimitClear.length + 1

        params = {
          isTimeLimit: this.isTimeLimit,
          level: level,
        }
        this.$emit("push-page", {
          ...playPage,
          onsNavigatorProps: params
        });
      }
    },
    goClose(e, title){
      if(e.type === 'tap' || e.type === 'pressup' || e.type === 'panstart'){
        setTimeout(() => {
          this.isModalOn = false;
        }, 100)
        setTimeout(() => {
          this.clearVisible = false;
        }, 400)
      }
    },
    isClear(){
      for(const item of this.realBoardItems){
        if(item.open === false){
          return false;
        }
      }
      setTimeout(() => {
        this.clearVisible = true;
      }, 10)
      setTimeout(() => {
        this.isModalOn = true;
      }, 200)
    },
  }
}
</script>