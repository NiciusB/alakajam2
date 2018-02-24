<template>
  <div class="hello">
    <div id="info">
      <span>Day: {{game.day}}</span>
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
      game: {}
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
  width: 760px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
}
#gameCanvas {
  width: 760px;
  height: 720px;
  background: rgba(255, 255, 255, 0.1);
}
</style>
