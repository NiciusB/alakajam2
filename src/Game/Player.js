import MazeCell from './Cell'

class Player {
  constructor (game, x, y) {
    this.game = game
    this.ctx = this.game.ctx
    this.size = this.constructor.size
    this.energy = 100
    this.loseEnergy(0)
    this.x = x
    this.y = y
    this.centeredX = this.getCenteredPos(this.x)
    this.centeredY = this.getCenteredPos(this.y)
    this.floatingOffset = {
      val: 0,
      dir: 'up'
    }
    this.game.onKeyDown(e => { this.keyDown(e) })
  }
  draw () {
    this.smoothlyMove()
    this.drawBody()
  }
  drawBody () {
    this.ctx.save()
    this.floatingOffset.val += 0.08 * (this.floatingOffset.dir === 'up' ? -1 : 1)
    if (this.floatingOffset.val < -2) this.floatingOffset.dir = 'down'
    if (this.floatingOffset.val > 2) this.floatingOffset.dir = 'up'
    this.ctx.drawImage(this.game.sprites.ghost, this.centeredX - this.size / 2, this.centeredY - this.size / 2 + this.floatingOffset.val, this.size, this.size)
    this.ctx.restore()
  }
  smoothlyMove () {
    this.centeredX = this.getCenteredPos(this.x) * 0.3 + this.centeredX * 0.7
    this.centeredY = this.getCenteredPos(this.y) * 0.3 + this.centeredY * 0.7
  }
  keyDown (e) {
    if ((e.key === 'ArrowDown' || e.code === 'KeyS') && this.getCurrentCell().canSouth) {
      this.y++
      this.loseEnergy()
    }
    if ((e.key === 'ArrowUp' || e.code === 'KeyW') && this.getCurrentCell().canNorth) {
      this.y--
      this.loseEnergy()
    }
    if ((e.key === 'ArrowLeft' || e.code === 'KeyA') && this.getCurrentCell().canWest) {
      this.x--
      this.loseEnergy()
    }
    if ((e.key === 'ArrowRight' || e.code === 'KeyD') && this.getCurrentCell().canEast) {
      this.x++
      this.loseEnergy()
    }
  }
  loseEnergy (howMuch = 1) {
    this.energy -= howMuch
    if (this.energy < 0) this.game.UI.playerDeath()
    if (this.energy <= 100) this.feelings = 'You look around trying to understand where you are'
    if (this.energy <= 80) this.feelings = 'You are starting to get tired'
    if (this.energy <= 70) this.feelings = 'There must be a way out'
    if (this.energy <= 50) this.feelings = 'You are feeling really sleepy'
    if (this.energy <= 10) this.feelings = 'You eyes won\'t be open for much longer'
  }
  getCurrentCell () {
    return this.game.mazeManager.get(this.x, this.y)
  }
  getCenteredPos (pos) {
    return pos * MazeCell.size + MazeCell.size / 2
  }

  static get size () {
    return 40
  }
}

export default Player
