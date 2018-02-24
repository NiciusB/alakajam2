import generateMaze from '@/maze_gen'

class MazeManager {
  constructor (game, ctx) {
    this.game = game
    this.ctx = ctx
    this.seed = Math.floor(new Date() / 100)
    this.height = ctx.canvas.height / this.game.Cell.size
    this.width = ctx.canvas.width / this.game.Cell.size
    this._maze = generateMaze(this.game.Rand.rand)(this.height, this.width)
    this.maze = []
    for (var col = 0; col < this.height; col++) {
      this.maze[col] = []
      for (var row = 0; row < this.width; row++) {
        this.maze[col][row] = new this.game.Cell(this, row, col, this._maze[col][row])
      }
    }
  }
  randFromTo (from, to) {
    return Math.floor(this.rand() * to) + from
  }
  get (row, col) {
    return this.maze[col][row]
  }
  draw () {
    this.drawMaze()
  }
  drawMaze () {
    for (var col = 0; col < this.height; col++) {
      for (var row = 0; row < this.width; row++) {
        this.get(row, col).draw()
      }
    }
  }
}

export default MazeManager
