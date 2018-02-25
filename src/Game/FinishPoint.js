import MazeCell from './Cell'

class FinishPoint {
  constructor (game, mazeManager) {
    this.game = game
    this.mazeManager = mazeManager
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
    if (this.x === this.game.player.x && this.y === this.game.player.y) {
      this.game.UI.dayFinished()
    }
  }
  drawBody () {
    this.ctx.save()
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
    this.ctx.beginPath()
    this.ctx.arc(this.getCenteredPos(this.x), this.getCenteredPos(this.y), this.size + this.sizeOffset.val, 0, 2 * Math.PI, false)
    this.ctx.fill()
    this.ctx.restore()
  }
  getCenteredPos (pos) {
    return pos * MazeCell.size + MazeCell.size / 2
  }
  getRandomPoint (iterationN = 0) {
    const randomPoint = {
      x: this.game.Rand.randFromTo(0, this.mazeManager.width),
      y: this.game.Rand.randFromTo(0, this.mazeManager.height)
    }
    const distance = this.game.player.getCurrentCell().distanceToCell(this.mazeManager.get(randomPoint))
    if (!distance) return {x: -1, y: -1} // Unable to find path
    var maxDistance = 2
    if (this.game.day === 1) maxDistance = 50
    else if (this.game.day === 2) maxDistance = 70
    else if (this.game.day === 3) maxDistance = 90
    if (distance >= maxDistance * 0.9 && distance <= maxDistance * 1.1) {
      return randomPoint
    } else {
      if (iterationN > 50) return {x: -1, y: -1}
      return this.getRandomPoint(iterationN + 1)
    }
  }
}

export default FinishPoint
