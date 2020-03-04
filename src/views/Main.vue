<template>
  
  <v-ons-page>
    <v-ons-toolbar class="white" style="min-height:64px;">
      <div class="left pl-3 pt-3 fo w-100" style="font-size:32px;">sdf</div>
      <div class="right pt-2">
      </div>
    </v-ons-toolbar>

    <div
      class="game-background"
      :style="`background:url('${backgroundImage}'); `">
      
      <div class="pa-5" ref="boardWrap" style="position: absolute;">
        <div id="board-real" :style="`max-height:${boardHeight}px; overflow:hidden`">
          <div
            v-for="(item, index) in realBoardItems"
            :key="index"
            class="piece-wrap"
            :style="`width: ${pWidth}px; height:${pHeight}px`"
            v-hammer:tap="(event)=> clickPiece(event, index)"
            v-hammer:pan="(event)=> clickPiece(event, index)"
          >
            <div class="piece" :style="``">{{index}}</div>
          </div>
        </div>
      </div>

    </div>

  </v-ons-page>
</template>

<script>
export default {
  name: 'm',
  data(){
    return {
      backgroundImage: '',
      row: 4,
      pWidth: '',
      pHeight: '',
      realBoardItems: []
    }
  },
  created(){
    this.backgroundImage = require(`../assets/img/background/background.jpg`);
    this.setBoard();
  },
  methods: {
    clickPiece(e, i) {
      console.log(e)
      console.log(i)
    },
    setBoard(){
      let clientWidth = document.body.clientWidth - 40;
      this.pWidth = this.pHeight = clientWidth / this.row;
      this.boardHeight = clientWidth;
      
      let temp = [];
      for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.row; j++) {
          let item = {};
          item.class = "piece-item";
          temp.push(item);
        }
      }
      this.realBoardItems = temp;
    }
  }
}
</script>