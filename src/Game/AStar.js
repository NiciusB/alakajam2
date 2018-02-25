import aStar from 'a-star'

class AStar {
  constructor (options) {
    this.aStarOptions = Object.assign({
      heuristic (node) {
        return 1
      },
      distance (node1, node2) {
        return 1
      },
      timeout: 500,
      neighbor (node) {
        return [
          node.north(),
          node.south(),
          node.west(),
          node.east()
        ].filter(function (item, pos, self) {
          return self.indexOf(item) === pos && item !== node
        })
      }
    }, options)
  }
  search (options = {}) {
    var result = { status: 'error' }
    try {
      result = aStar(Object.assign(this.aStarOptions, options))
    } catch (e) {
      console.log(e)
    }
    return result
  }
  cellToCell (cell1, cell2) {
    return this.search({
      start: cell1,
      isEnd: node => node === cell2
    })
  }
}

export default AStar
