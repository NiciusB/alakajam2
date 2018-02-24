import Maze from './index'

class UI {
  constructor (mazeManager, player) {
    this.mazeManager = mazeManager
    this.player = player
    this.ctx = this.mazeManager.ctx
  }
  draw () {
    this.drawFog()
    this.drawCoordinates()
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
    var grd = this.ctx.createRadialGradient(this.player.centeredX, this.player.centeredY, 120, this.player.centeredX, this.player.centeredY, 150)
    grd.addColorStop(0, 'transparent')
    grd.addColorStop(1, 'rgba(25,25,25,0.9)')
    this.ctx.fillStyle = grd
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
}

export default UI
