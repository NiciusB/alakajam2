import seedrandom from 'seedrandom'

class Rand {
  constructor () {
    this.seed = Math.floor(new Date() / 100)
    this.rand = seedrandom(this.seed)
  }
  randFromTo (from, to) {
    return Math.floor(this.rand() * to) + from
  }
}

export default Rand
