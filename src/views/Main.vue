<template>
  
  <v-ons-page>
    <v-ons-toolbar class="white" style="min-height:64px;">
      <div class="left pl-3 pt-3 fo w-100" style="font-size:32px;">STAGE 1</div>
      <div class="right pt-2">
      </div>
    </v-ons-toolbar>

    <div
      class="game-background"
      :style="`background:url('${backgroundImage}'); `">
      
      <div class="pa-5">
        <div id="board-real">
          <div
            v-for="(item, index) in realBoardItems"
            :key="index"
            class="piece-wrap"
            :style="`width: ${pWidth}px; height:${pHeight}px`"
            v-hammer:tap="(event)=> clickPiece(event, item.id)"
            v-hammer:pan.start="(event)=> clickPiece(event, item.id)"
          >
            <div class="piece on" :style="`${item.style}`">{{index}}</div>
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
      realBoardItems: [],
      selectPieceNumber: -1,
      previousDom: null
    }
  },
  created(){
    this.backgroundImage = require(`../assets/img/background/background.jpg`);
    this.setBoard();
  },
  methods: {
    clickPiece(e, i) {
      if(this.selectPieceNumber === -1){
        this.selectPieceNumber = i;
        this.previousDom = e.target; 
        this.previousDom.classList.remove('on')
      } else if(this.selectPieceNumber === i){ // 같은거 클릭시
        console.log('success')
        
          this.previousDom.classList.remove('on')
          e.target.classList.remove('on')
          
          e.target.classList.add('success')
          this.previousDom.classList.add('success')
        this.selectPieceNumber = -1
      } else if(this.selectPieceNumber !== i){ // 다른거 클릭시
        console.log('fail')
        this.selectPieceNumber = -1

        e.target.classList.remove('on')

        setTimeout(() => {
          e.target.classList.add('on')
          this.previousDom.classList.add('on')
        }, 500)
      }
    },
    setBoard(){
      let clientWidth = document.body.clientWidth - 40;
      this.pWidth = this.pHeight = clientWidth / this.row;
      this.boardHeight = clientWidth;

      let len = this.row * this.row / 2;
      
      let temp = [];
      for (let i = 0; i < len; i++) {
        let item = {};
        item.id = i;
        item.style = `width: ${this.pWidth}px; height: ${this.pHeight}px; background: url(${require(`../assets/img/piece/${i}.png`)}); background-size:cover;`;
        temp.push(item);
      }
      temp = temp.concat(temp);
      this.realBoardItems = this.shuffle(temp);
    },
    
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
  }
}
</script>