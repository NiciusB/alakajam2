<template>
  <div id="app">
    <welcome v-if="preGame" @name="moveToGame"/>
    <game-base v-else ref="gamebaseelm" />
  </div>
</template>

<script>
import Welcome from './components/Welcome'
import GameBase from './components/GameBase'

export default {
  name: 'App',
  components: {
    Welcome,
    GameBase
  },
  data () {
    return {
      preGame: true
    }
  },
  methods: {
    moveToGame (name) {
      console.log(this.$refs.gamebaseelm)
      this.preGame = false
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
