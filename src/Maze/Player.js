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
    this.ctx.fillRect(this.centeredX, this.centeredY, this.size, this.size)
    this.ctx.restore()
  }
  smoothlyMove () {
    this.centeredX = this.getCenteredPos(this.x) * 0.2 + this.centeredX * 0.8
    this.centeredY = this.getCenteredPos(this.y) * 0.2 + this.centeredY * 0.8
  }
  keyDown (e) {
    if ((e.key === 'ArrowDown' || e.code === 'KeyS') && this.mazeManager.get(this.x, this.y).canSouth) {
      this.y++
    }
    if ((e.key === 'ArrowUp' || e.code === 'KeyW') && this.mazeManager.get(this.x, this.y).canNorth) {
      this.y--
    }
    if ((e.key === 'ArrowLeft' || e.code === 'KeyA') && this.mazeManager.get(this.x, this.y).canWest) {
      this.x--
    }
    if ((e.key === 'ArrowRight' || e.code === 'KeyD') && this.mazeManager.get(this.x, this.y).canEast) {
      this.x++
    }
  }
  getCenteredPos (pos) {
    return pos * Maze.Cell.size + Maze.Cell.size / 2 - this.size / 2
  }

  static get size () {
    return 20
  }
}

export default Player
