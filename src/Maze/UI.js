import Maze from './index'

class UI {
  constructor (mazeManager, player) {
    this.mazeManager = mazeManager
    this.player = player
    this.ctx = this.mazeManager.ctx
    this.veil = {
      value: 1,
      status: 'intro' // 'intro' or 'outro'
    }
  }
  draw () {
    this.drawFog()
    this.drawCoordinates()
    if (this.veil.value > 0) {
      this.veil.value += 0.03 * (this.veil.status === 'intro' ? -1 : 1)
      if (this.veil.status === 'outro' && this.veil.value >= 1.5) Maze.newLevel()
      this.drawGameVeil()
    }
  }
  drawCoordinates () {
    this.ctx.save()
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = '#f1f1f1'
    this.ctx.font = '14px Helvetica'
    this.ctx.fillText(`Seed: ${Maze.Rand.seed}`, 20, 20)
    this.ctx.restore()
  }
  drawFog () {
    var grd = this.ctx.createRadialGradient(this.player.centeredX, this.player.centeredY, 20, this.player.centeredX, this.player.centeredY, 150)
    grd.addColorStop(0, 'transparent')
    grd.addColorStop(1, 'rgba(25,25,25,1)')
    this.ctx.fillStyle = grd
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
  drawGameVeil () {
    this.ctx.save()
    this.ctx.fillStyle = `rgba(200, 200, 200, ${this.veil.value > 1 ? 1 : this.veil.value})`
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.restore()
  }
  gameFinished () {
    this.veil.value = 0.00001
    this.veil.status = 'outro'
  }
}

export default UI
