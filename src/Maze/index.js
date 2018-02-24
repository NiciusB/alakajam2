import MazeManager from './Manager'
import MazeCell from './Cell'
import UI from './UI'
import MazePlayer from './Player'
import Rand from './Rand'
import FinishPoint from './FinishPoint'

export default {
  Cell: MazeCell,
  gameLoop () {
    if (this.loadingNewLevel) return
    this.mazeManager.draw()
    this.player.draw()
    this.finishPoint.draw()
    this.UI.draw()
    window.requestAnimationFrame(() => this.gameLoop())
  },
  init () {
    this.canvas = document.getElementById('game')
    this.canvas.width = this.canvas.clientWidth
    this.canvas.height = this.canvas.clientHeight
    this.ctx = this.canvas.getContext('2d')
    this.sprites = {
      bg: new Image(),
      ghost: new Image()
    }
    for (let key in this.sprites) this.sprites[key].src = `/static/${key}.png`
    this.newLevel()
    this.gameLoop()
  },
  newLevel () {
    this.loadingNewLevel = true
    this.Rand = new Rand()
    this.mazeManager = new MazeManager(this, this.ctx)
    this.player = new MazePlayer(this, Math.round(this.mazeManager.width / 2) - 1, Math.round(this.mazeManager.height / 2) - 1)
    this.finishPoint = new FinishPoint(this, this.mazeManager, this.player)
    this.UI = new UI(this.mazeManager, this.player)
    this.loadingNewLevel = false
  }
}
