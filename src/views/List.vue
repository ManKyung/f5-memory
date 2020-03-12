<template>
  <v-ons-page class="game-page">
    <v-ons-toolbar class="white" style="min-height:64px;">
      <div class="left pt-2" style="z-index: 2;">
        <v-ons-back-button class="pl-4" style="fill:#fff"></v-ons-back-button>
      </div>
      <div class="center text-center fo w-100 fs-20" style="padding-top: 10px;">CLEAR</div>
      <div class="right" style="padding-top: 10px;">
        <v-ons-toolbar-button
          modifier="quiet"
          class="black--text"
          @click="doReset"
        >
          <v-ons-icon icon="ion-ios-refresh"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <div class="mb-1 pa-2">
      <div class="btn-group">
        <v-ons-button
          :class="clearType === 'noLimitClear' ? 'on' : ''"
          v-hammer:tap="(e)=> setMyType(e, 'noLimitClear')"
          v-hammer:press="(e)=> setMyType(e, 'noLimitClear')"
          v-hammer:pressup="(e)=> setMyType(e, 'noLimitClear')"
          v-hammer:pan.start="(e)=> setMyType(e, 'noLimitClear')"
        >No Time Limit</v-ons-button>
        <v-ons-button
          :class="clearType === 'limitClear' ? 'on' : ''"
          v-hammer:tap="(e)=> setMyType(e, 'limitClear')"
          v-hammer:press="(e)=> setMyType(e, 'limitClear')"
          v-hammer:pressup="(e)=> setMyType(e, 'limitClear')"
          v-hammer:pan.start="(e)=> setMyType(e, 'limitClear')"
        >Time Limit</v-ons-button>
      </div>

      <div class="pt-5">
        <v-ons-list v-if="clearType === 'noLimitClear'">
          <v-ons-list-item modifier="longdivider" v-for="item in noLimitClear" :key="item.level">
            <div class="left">LEVEL {{item.level}}</div>
            <div class="right">{{item.time}} sec</div>
          </v-ons-list-item>
        </v-ons-list>
        <v-ons-list v-else>
          <v-ons-list-item modifier="longdivider" v-for="item in limitClear" :key="item.level">
            <div class="left">LEVEL {{item.level}}</div>
            <div class="right">{{item.time}} sec</div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </div>
  </v-ons-page>
</template>
<script>
export default {
  name: "clear-list",
  data() {
    return {
      clearType: "noLimitClear",
      limitClear: this.$store.state.gameSet.limitClear,
      noLimitClear: this.$store.state.gameSet.noLimitClear,
    };
  },
  methods: {
    setMyType(e, value) {
      if (e.type === "tap" || e.type === "pressup" || e.type === "panstart") {
        this.clearType = value;
      }
    },
    doReset(e) {
      this.$ons.notification
        .confirm("Are you sure?", { title: "Reset" })
        .then(response => {
          if (response) {
            this.$store.commit('gameSet/setClearListReset', this.clearType);
            this.limitClear = this.$store.state.gameSet.limitClear;
            this.noLimitClear = this.$store.state.gameSet.noLimitClear;
          }
        });
    },
  }
};
</script>