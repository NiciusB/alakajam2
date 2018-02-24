class FinishPoint {
  constructor (game, mazeManager, player) {
    this.game = game
    this.mazeManager = mazeManager
    this.player = player
    this.ctx = this.mazeManager.ctx
    const randomPoint = this.getRandomPoint()
    this.x = randomPoint.x
    this.y = randomPoint.y
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
    return pos * this.game.Cell.size + this.game.Cell.size / 2 - this.size / 2
  }
  getRandomPoint () {
    const randomPoint = {
      x: this.game.Rand.randFromTo(0, this.mazeManager.width),
      y: this.game.Rand.randFromTo(0, this.mazeManager.height)
    }
    /*
    const solved = mazeSolver({
      maze: this.game.mazeManager._maze,
      start: randomPoint,
      end: {
        x: this.game.player.x,
        y: this.game.player.y
      }
    })
    console.log(solved)
    */
    return randomPoint
  }
}

export default FinishPoint
