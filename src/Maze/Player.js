import Maze from './index'

class Player {
  constructor (mazeManager, x, y) {
    this.mazeManager = mazeManager
    this.ctx = this.mazeManager.ctx
    this.size = this.constructor.size
    this.x = x
    this.y = y
    this.centeredX = this.getCenteredPos(this.x)
    this.centeredY = this.getCenteredPos(this.y)
    document.addEventListener('keydown', (e) => { this.keyDown(e) })
  }
  draw () {
    this.smoothlyMove()
    this.drawBody()
  }
  drawBody () {
    this.ctx.save()
    this.ctx.fillStyle = '#00f'
    this.ctx.fillRect(this.centeredX - this.size / 2, this.centeredY - this.size / 2, this.size, this.size)
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
    return this.mazeManager.get(this.x, this.y)
  }
  getCenteredPos (pos) {
    return pos * Maze.Cell.size + Maze.Cell.size / 2
  }

  static get size () {
    return 20
  }
}

export default Player
