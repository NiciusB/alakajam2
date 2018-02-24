import seedrandom from 'seedrandom'

class Rand {
  constructor () {
    this.seed = Math.random().toString(36).slice(5).toUpperCase()
    this.rand = seedrandom(this.seed)
  }
  randFromTo (from, to) {
    return Math.floor(this.rand() * to) + from
  }
}

export default Rand
