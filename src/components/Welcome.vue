<template>
  <div class="hello">
    <h1>Welcome wanderer. What is your name?</h1>
    <input v-model="nameVal" placeholder="Your name" @keypress="nameKeyPress" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      nameVal: ''
    }
  },
  methods: {
    nameKeyPress (e) {
      if (e.keyCode === 13) { // Enter key
        this.$emit('name', this.nameVal)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
