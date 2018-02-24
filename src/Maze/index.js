import MazeManager from './Manager'
import MazeCell from './Cell'
import UI from './UI'
import MazePlayer from './Player'
import Rand from './Rand'
import FinishPoint from './FinishPoint'
import AStar from './AStar'

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
    this.ctx.imageSmoothingEnabled = false
    this.newLevel()
    this.gameLoop()
  },
  newLevel () {
    this.loadingNewLevel = true
    this.Rand = new Rand()
    this.mazeManager = new MazeManager(this, this.ctx)
    this.aStar = new AStar(this)
    this.player = new MazePlayer(this.mazeManager, this.Rand.randFromTo(0, this.mazeManager.width), this.Rand.randFromTo(0, this.mazeManager.height))
    this.finishPoint = new FinishPoint(this, this.mazeManager, this.player)
    this.UI = new UI(this.mazeManager, this.player)
    this.loadingNewLevel = false
  }
}
