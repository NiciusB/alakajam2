<template>
  <div id="game">
  </div>
</template>

<script>
import Phaser from 'phaser'
export default {
  mounted () {
    var gameConfig = {
      type: Phaser.AUTO,
      width: 100,
      height: 100,
      scene: [],
      parent: 'game'
    }
    this.game = new Phaser.Game(gameConfig)
    this.game.canvas.style.width = 500 + 'px'
    this.game.canvas.style.height = 500 + 'px'
  },
  data () {
    return {
      game: false
    }
  },
  methods: {
    resize () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  display: inline;
}
</style>
