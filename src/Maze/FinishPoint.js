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
    const distance = this.player.getCurrentCell().distanceToCell(this.mazeManager.get(randomPoint))
    if (distance < 50 || distance > 200) return this.getRandomPoint()
    return randomPoint
  }
}

export default FinishPoint
