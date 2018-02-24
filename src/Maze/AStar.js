import aStar from 'a-star'

class AStar {
  constructor (game) {
    this.game = game
    this.aStarOptions = {
      heuristic (node) {
        return 1
      }
    }
  }
  search (options) {
    aStar(Object.assign(this.aStarOptions, options))
  }
}

export default AStar