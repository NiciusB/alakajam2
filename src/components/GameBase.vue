<template>
  <div class="hello">
    <canvas id="game"></canvas>
  </div>
</template>

<script>
import Maze from '@/Maze'

export default {
  mounted () {
    Maze.init()
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
}
#game {
  width: 480px;
  height: 800px;
  background: rgba(255, 255, 255, 0.1);
}
</style>
