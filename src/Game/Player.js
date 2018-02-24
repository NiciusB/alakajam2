import MazeCell from './Cell'

class Player {
  constructor (game, x, y) {
    this.game = game
    this.ctx = this.game.ctx
    this.size = this.constructor.size
    this.x = x
    this.y = y
    this.centeredX = this.getCenteredPos(this.x)
    this.centeredY = this.getCenteredPos(this.y)
    this.floatingOffset = {
      val: 0,
      dir: 'up'
    }
    document.addEventListener('keydown', (e) => { this.keyDown(e) })
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
    }
    if ((e.key === 'ArrowUp' || e.code === 'KeyW') && this.getCurrentCell().canNorth) {
      this.y--
    }
    if ((e.key === 'ArrowLeft' || e.code === 'KeyA') && this.getCurrentCell().canWest) {
      this.x--
    }
    if ((e.key === 'ArrowRight' || e.code === 'KeyD') && this.getCurrentCell().canEast) {
      this.x++
    }
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
