import Maze from './index'

class FinishPoint {
  constructor (game, mazeManager, player) {
    this.game = game
    this.mazeManager = mazeManager
    this.player = player
    this.ctx = this.mazeManager.ctx
    this.x = Maze.Rand.randFromTo(0, this.mazeManager.width)
    this.y = Maze.Rand.randFromTo(0, this.mazeManager.height)
    this.size = 20
    this.finished = false
  }
  draw () {
    this.drawBody()
    if (!this.finished && this.x === this.player.x && this.y === this.player.y) {
      this.finished = true
      this.game.UI.gameFinished()
    }
  }
  drawBody () {
    this.ctx.save()
    this.ctx.fillStyle = '#f00'
    this.ctx.fillRect(this.getCenteredPos(this.x), this.getCenteredPos(this.y), this.size, this.size)
    this.ctx.restore()
  }
  getCenteredPos (pos) {
    return pos * Maze.Cell.size + Maze.Cell.size / 2 - this.size / 2
  }
}

export default FinishPoint
