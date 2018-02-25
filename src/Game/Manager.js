import generateMaze from '@/maze_gen'
import MazeCell from './Cell'

class MazeManager {
  constructor (game, width, height) {
    this.game = game
    this.ctx = this.game.ctx
    this.seed = Math.floor(new Date() / 100)
    this.width = width / MazeCell.size
    this.height = height / MazeCell.size
    try {
      this._maze = generateMaze(this.game.Rand.rand)(this.height, this.width)
    } catch (e) {
      this._maze = false
      this.game.newLevel()
      return
    }
    this.maze = []
    for (var col = 0; col < this.height; col++) {
      this.maze[col] = []
      for (var row = 0; row < this.width; row++) {
        this.maze[col][row] = new MazeCell(this.game, row, col, this._maze[col][row])
      }
    }
  }
  randFromTo (from, to) {
    return Math.floor(this.rand() * to) + from
  }
  get (arg1, arg2 = false) {
    if (arg2 === false) {
      return this.maze[arg1.y][arg1.x]
    } else {
      return this.maze[arg2][arg1]
    }
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
