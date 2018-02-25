class UI {
  constructor (game) {
    this.game = game
    this.player = this.game.player
    this.ctx = this.game.ctx
    this.veil = {}
    this.startVeil('intro', true)
    this.game.onKeyDown(e => { this.keyDown(e) })
  }
  draw () {
    this.drawFog()
    if (this.veil.status !== 'none') {
      switch (this.veil.status) {
        case 'intro':
          this.veil.value -= 0.01
          if (this.veil.value <= 0) {
            this.startVeil('none', true)
          }
          break
        case 'outro':
          this.veil.value += 0.03
          if (this.veil.value >= 1.5) {
            this.game.day++
            if (this.game.day <= 3) this.game.newLevel()
            else {
              this.game.player.feelings = ''
              this.startVeil('victory', true)
            }
          }
          break
        case 'lose':
          this.veil.value += 0.03
          break
        case 'victory':
          this.veil.value += 0.03
          break
      }
      this.drawGameVeil()
      this.drawGameVeilText()
    }
  }
  drawGameVeil () {
    this.ctx.save()
    this.ctx.fillStyle = `rgba(25, 25, 25, ${this.veil.value > 1 ? 1 : this.veil.value})`
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.restore()
  }
  drawGameVeilText () {
    this.ctx.save()
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = '#a1a1a1'
    this.ctx.font = '16px Helvetica'
    if (this.veil.status === 'lose' && this.veil.value > 0.8) {
      this.ctx.fillText(`You died on day ${this.game.day}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 15)
      this.ctx.fillText('Press any key to restart', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 15)
    } else if (this.veil.status === 'victory') {
      this.ctx.fillText(`Congratulations. You escaped the maze after ${this.game.steps} steps`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 15)
      this.ctx.fillText('Press any key to restart', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 15)
    } else if (this.veil.status === 'intro' && this.veil.value > 0.8) {
      this.ctx.fillText(`Day ${this.game.day}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)
    }
    this.ctx.restore()
  }
  drawFog () {
    var grd = this.ctx.createRadialGradient(this.player.centeredX, this.player.centeredY, 20, this.player.centeredX, this.player.centeredY, this.player.visionRange)
    grd.addColorStop(0, 'transparent')
    grd.addColorStop(1, 'rgba(25,25,25,1)')
    this.ctx.fillStyle = grd
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
  startVeil (newStatus = 'none', force = false) {
    if (force || this.veil.status === 'none') {
      this.veil.status = newStatus
      this.veil.value = newStatus === 'intro' ? 2 : (newStatus === 'victory' ? 1 : 0)
    }
  }
  dayFinished () {
    this.startVeil('outro')
  }
  playerDeath () {
    this.startVeil('lose')
  }
  keyDown (e) {
    if (this.veil.status === 'lose' && this.veil.value > 2.5) {
      this.game.newGame()
    }
    if (this.veil.status === 'victory' && this.veil.value > 2.5) {
      this.game.newGame()
    }
  }
}

export default UI
