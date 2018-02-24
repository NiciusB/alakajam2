<template>
  <div class="hello">
    <div id="info" v-if="game">
      <span>Day {{game.day}}.</span>
      <span>{{game.player.feelings}}</span>
      <span class="seed">Seed: {{game.Rand.seed}}</span>
    </div>
    <canvas id="gameCanvas"></canvas>
  </div>
</template>

<script>
import Game from '@/Game'

export default {
  mounted () {
    this.game = new Game()
  },
  data () {
    return {
      game: false
    }
  }
}
</script>

<style lang="scss" scoped>
.hello {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
  flex-direction: column;
}
#info {
  width: 560px;
  height: 40px;
  color: rgb(200, 200, 200);
  background: rgb(25, 25, 25);
  line-height: 40px;
  padding: 0 0.5em;
  box-sizing: border-box;
  .seed {
    float: right;
    font-size: 0.6em;
  }
}
#gameCanvas {
  width: 560px;
  height: 560px;
  background: rgba(255, 255, 255, 0.1);
}
</style>
