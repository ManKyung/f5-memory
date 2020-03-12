import Vue from 'vue'
import Vuex from 'vuex'
import stage from "@/assets/js/stage.js";
import bgMusic from "@/assets/mp3/background.mp3";
import clickSound from "@/assets/mp3/click.mp3";
import success from "@/assets/mp3/success.mp3";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gameSet: {
      namespaced: true,
      state: {
        limitClear: [], // on 시간제한 있는거
        noLimitClear: [], // off 시간제한 없는거
        stage: [],
        bgMusic: new Audio(bgMusic),
        clickSound: new Audio(clickSound),
        successSound: new Audio(success),
        isSound: true,
        isShowAd: true,
        isVibration: true,
      },
      mutations: {
        setVibrate(state, value) {
          state.isVibration = value;
        },
        setStage(state){
          state.stage = stage;
        },
        // setting sound
        setSound(state, value) {
          state.isSound = value;
          if(value) {
            state.clickSound.play();
          }
        },
        // setting success sound
        setSuccessSound(state) {
          state.successSound.play();
        },
        setShowAd(state){
          // 1 minutes = 60000

          let getTime = Number(localStorage['adTime']);
          if((new Date()).getTime() > Number(getTime) + 60000 * 1.5){ // 1 minutes 30 seconds
            localStorage['adTime'] = (new Date()).getTime();
            state.isShowAd = true;
          } else {
            state.isShowAd = false;
          }
        },
        setClearListReset(state, value){
          if(value === 'noLimitClear') {
            state.noLimitClear = [];
          }else if (value === 'limitClear') {
            state.limitClear = [];
          }
          localStorage.removeItem(value);
        },
        setGameInit(state){
          state.noLimitClear = localStorage['noLimitClear'] === undefined ? [] : JSON.parse(localStorage['noLimitClear']);
          state.limitClear = localStorage['limitClear'] === undefined ? [] : JSON.parse(localStorage['limitClear']);

          if(localStorage['adTime'] === undefined) {
            localStorage['adTime'] = (new Date()).getTime();
          }
        }
      },
      actions: {
        setGameClear(context, obj) {
          let state = context.state;

          if(!obj.isTimeLimit) { // 시간제한 없는것
            state.noLimitClear.push({
              level: obj.level,
              time: obj.time,
            });
            localStorage['noLimitClear'] = JSON.stringify(state.noLimitClear);
          } else {
            state.limitClear.push({
              level: obj.level,
              time: obj.time,
            });
            localStorage['limitClear'] = JSON.stringify(state.limitClear);
          }
          // context.commit('removeMy', obj)

          // let clear = state.clear;
          // if(state.clear[obj.category] === undefined) {
          //   state.clear[obj.category] = {};
          // }

          // if(state.clear[obj.category][obj.id] === undefined) {
          //   state.clear[obj.category][obj.id] = {
          //     src: obj.src,
          //     level: obj.level,
          //     jigsaw: [],
          //     switch: [],
          //     slider: [],
          //     rotate: [],
          //   }

          //   state.clear[obj.category][obj.id][obj.gameType].push(obj.pCount)
          // } else {
          //   let t = state.clear[obj.category][obj.id][obj.gameType];
          //   if(t.indexOf(obj.pCount) === -1){
          //     state.clear[obj.category][obj.id][obj.gameType].push(obj.pCount)
          //   }
          // }

          // clear[obj.category] = state.clear[obj.category];
          // localStorage['game-clear'] = JSON.stringify(clear);
        },
      }
    }
  }
})
