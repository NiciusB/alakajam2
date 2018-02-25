<template>
  <div class="hello">
    <div id="info" v-if="game && game.player">
      <span>{{game.player.feelings}}</span>
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
  width: 520px;
  height: 40px;
  color: #eee;
  background: rgb(25, 25, 25);
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  padding: 0 0.5em;
  box-sizing: border-box;
}
#gameCanvas {
  width: 520px;
  height: 520px;
  background: rgb(25, 25, 25);
}
</style>
