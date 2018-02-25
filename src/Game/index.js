import MazeManager from './Manager'
import UI from './UI'
import MazePlayer from './Player'
import Rand from './Rand'
import FinishPoint from './FinishPoint'

class Game {
  constructor () {
    document.addEventListener('keydown', (e) => { this.keyDown(e) }, { passive: true })
    document.addEventListener('keyup', (e) => { this.keyUp(e) }, { passive: true })
    this.canvas = document.getElementById('gameCanvas')
    this.canvas.width = this.canvas.clientWidth
    this.canvas.height = this.canvas.clientHeight
    this.ctx = this.canvas.getContext('2d')
    this.keyDownCallbacks = []
    this.keyUpCallbacks = []
    this.spritesLoaded = 0
    this.loaded = false
    this.sprites = {
      bg: new Image(),
      ghost: new Image()
    }
    for (let key in this.sprites) {
      this.sprites[key].onload = () => {
        this.spritesLoaded++
        if (this.spritesLoaded === Object.keys(this.sprites).length) {
          this.newGame()
          this.gameLoop()
          this.loaded = true
        }
      }
      this.sprites[key].src = `static/${key}.png`
    }
  }
  newGame () {
    this.day = 1
    this.steps = 0
    this.Rand = new Rand()
    this.newLevel()
  }
  newLevel () {
    this.loadingNewLevel = true
    this.keyDownCallbacks = []
    this.keyUpCallbacks = []
    this.mazeManager = new MazeManager(this, this.canvas.width, this.canvas.height)
    if (!this.mazeManager._maze) return // mazeManager has failed. Stop
    this.player = new MazePlayer(this, Math.round(this.mazeManager.width / 2) - 1, Math.round(this.mazeManager.height / 2) - 1)
    this.finishPoint = new FinishPoint(this, this.mazeManager)
    if (!this.finishPoint.x === -1) return // finishPoint has failed. Stop
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
  onKeyUp (callback) {
    this.keyUpCallbacks.push(callback)
  }
  keyDown (e) {
    this.keyDownCallbacks.forEach(val => { val(e) })
  }
  keyUp (e) {
    this.keyUpCallbacks.forEach(val => { val(e) })
  }
}

export default Game
