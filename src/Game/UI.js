class UI {
  constructor (game) {
    this.game = game
    this.player = this.game.player
    this.ctx = this.game.ctx
    this.veil = {
      value: 1,
      status: 'intro' // 'intro' or 'outro'
    }
  }
  draw () {
    this.drawFog()
    this.drawTopLeftText()
    if (this.veil.value > 0) {
      this.veil.value += 0.03 * (this.veil.status === 'intro' ? -1 : 1)
      if (this.veil.status === 'outro' && this.veil.value >= 1.5) this.game.newLevel()
      this.drawGameVeil()
    }
  }
  drawTopLeftText () {
    this.ctx.save()
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    this.ctx.font = '14px Helvetica'
    this.ctx.fillText(`Seed: ${this.game.Rand.seed}`, 20, 20)
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
    this.ctx.fillStyle = `rgba(25, 25, 25, ${this.veil.value > 1 ? 1 : this.veil.value})`
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.restore()
  }
  gameFinished () {
    if (this.veil.status === 'outro') return // Already finishing
    this.veil.value = 0.00001
    this.veil.status = 'outro'
    this.game.day++
  }
}

export default UI
