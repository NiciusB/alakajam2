import MazeManager from './Manager'
import UI from './UI'
import MazePlayer from './Player'
import Rand from './Rand'
import FinishPoint from './FinishPoint'

class Game {
  constructor () {
    this.canvas = document.getElementById('gameCanvas')
    this.canvas.width = this.canvas.clientWidth
    this.canvas.height = this.canvas.clientHeight
    this.ctx = this.canvas.getContext('2d')
    this.sprites = {
      bg: new Image(),
      ghost: new Image()
    }
    for (let key in this.sprites) this.sprites[key].src = `/static/${key}.png`
    document.addEventListener('keydown', (e) => { this.keyDown(e) }, { passive: true })
    this.newGame()
    this.gameLoop()
  }
  newGame () {
    this.day = 1
    this.Rand = new Rand()
    this.newLevel()
  }
  newLevel () {
    this.loadingNewLevel = true
    this.keyDownCallbacks = []
    this.mazeManager = new MazeManager(this, this.canvas.width, this.canvas.height)
    this.player = new MazePlayer(this, Math.round(this.mazeManager.width / 2) - 1, Math.round(this.mazeManager.height / 2) - 1)
    this.finishPoint = new FinishPoint(this, this.mazeManager, this.player)
    this.UI = new UI(this)
    this.loadingNewLevel = false
  }
  gameLoop () {
    if (this.loadingNewLevel) return
    this.mazeManager.draw()
    this.finishPoint.draw()
    this.player.draw()
    this.UI.draw()
    window.requestAnimationFrame(() => this.gameLoop())
  }
  onKeyDown (callback) {
    this.keyDownCallbacks.push(callback)
  }
  keyDown (e) {
    this.keyDownCallbacks.forEach(val => { val(e) })
  }
}

export default Game
