import MazeManager from './Manager'
import MazeCell from './Cell'
import UI from './UI'
import MazePlayer from './Player'
import Rand from './Rand'
import FinishPoint from './FinishPoint'

export default {
  Cell: MazeCell,
  gameLoop () {
    this.mazeManager.draw()
    this.player.draw()
    this.finishPoint.draw()
    this.UI.draw()
    window.requestAnimationFrame(() => this.gameLoop())
  },
  init () {
    var canvas = document.getElementById('game')
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    var ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    this.Rand = new Rand()
    this.mazeManager = new MazeManager(ctx)
    this.player = new MazePlayer(this.mazeManager, this.Rand.randFromTo(0, this.mazeManager.width), this.Rand.randFromTo(0, this.mazeManager.height))
    this.finishPoint = new FinishPoint(this.mazeManager, this.player)
    this.UI = new UI(this.mazeManager, this.player)
    this.gameLoop()
  }
}
