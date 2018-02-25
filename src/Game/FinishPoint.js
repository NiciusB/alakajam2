import MazeCell from './Cell'

class FinishPoint {
  constructor (game, mazeManager, player) {
    this.game = game
    this.mazeManager = mazeManager
    this.player = player
    this.ctx = this.mazeManager.ctx
    const randomPoint = this.getRandomPoint()
    this.x = randomPoint.x
    this.y = randomPoint.y
    this.size = 9.5
    this.sizeOffset = {
      val: 0,
      dir: 'up'
    }
  }
  draw () {
    this.sizeOffset.val += 0.03 * (this.sizeOffset.dir === 'up' ? -1 : 1)
    if (this.sizeOffset.val < -1.2) this.sizeOffset.dir = 'down'
    if (this.sizeOffset.val > 1.2) this.sizeOffset.dir = 'up'
    this.drawBody()
    if (this.x === this.player.x && this.y === this.player.y) {
      this.game.UI.dayFinished()
    }
  }
  drawBody () {
    this.ctx.save()
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
    this.ctx.beginPath()
    this.ctx.arc(this.getCenteredPos(this.x), this.getCenteredPos(this.y), this.size + this.sizeOffset.val, 0, 2 * Math.PI, false)
    this.ctx.fill()
    // this.ctx.fillRect(this.getCenteredPos(this.x) - this.size / 2, this.getCenteredPos(this.y) - this.size / 2, this.size, this.size)
    this.ctx.restore()
  }
  getCenteredPos (pos) {
    return pos * MazeCell.size + MazeCell.size / 2
  }
  getRandomPoint () {
    const randomPoint = {
      x: this.game.Rand.randFromTo(0, this.mazeManager.width),
      y: this.game.Rand.randFromTo(0, this.mazeManager.height)
    }
    const distance = this.player.getCurrentCell().distanceToCell(this.mazeManager.get(randomPoint))
    const maxDistance = this.game.day === 0 ? 20 : (this.game.day === 0 ? 40 : 70)
    if (distance < maxDistance * 0.8 || distance > maxDistance) return this.getRandomPoint()
    return randomPoint
  }
}

export default FinishPoint
