import MazeCell from './Cell'

class Player {
  constructor (game, x, y) {
    this.game = game
    this.ctx = this.game.ctx
    this.size = this.constructor.size
    this.energy = 100
    this.loseEnergy(0)
    this.x = x
    this.y = y
    this.centeredX = this.getCenteredPos(this.x)
    this.centeredY = this.getCenteredPos(this.y)
    this.floatingOffset = {
      val: 0,
      dir: 'up'
    }
    this.movement = {
      up: false,
      down: false,
      left: false,
      right: false
    }
    this.game.onKeyDown(e => { this.keyDown(e) })
    this.game.onKeyUp(e => { this.keyUp(e) })
  }
  draw () {
    this.makeMovement()
    this.smoothlyMove()
    this.drawBody()
  }
  drawBody () {
    this.ctx.save()
    this.floatingOffset.val += 0.08 * (this.floatingOffset.dir === 'up' ? -1 : 1)
    if (this.floatingOffset.val < -2) this.floatingOffset.dir = 'down'
    if (this.floatingOffset.val > 2) this.floatingOffset.dir = 'up'
    this.ctx.drawImage(this.game.sprites.ghost, this.centeredX - this.size / 2, this.centeredY - this.size / 2 + this.floatingOffset.val, this.size, this.size)
    this.ctx.restore()
  }
  smoothlyMove () {
    const movSpeed = 3
    this.centeredX += this.getCenteredPos(this.x) > this.centeredX ? movSpeed : -movSpeed
    this.centeredY += this.getCenteredPos(this.y) > this.centeredY ? movSpeed : -movSpeed
    if (Math.abs(this.centeredX - this.getCenteredPos(this.x)) <= movSpeed) this.centeredX = this.getCenteredPos(this.x)
    if (Math.abs(this.centeredY - this.getCenteredPos(this.y)) <= movSpeed) this.centeredY = this.getCenteredPos(this.y)
  }
  keyDown (e) {
    if ((e.key === 'ArrowDown' || e.code === 'KeyS')) {
      this.movement.down = true
    }
    if ((e.key === 'ArrowUp' || e.code === 'KeyW')) {
      this.movement.up = true
    }
    if ((e.key === 'ArrowLeft' || e.code === 'KeyA')) {
      this.movement.left = true
    }
    if ((e.key === 'ArrowRight' || e.code === 'KeyD')) {
      this.movement.right = true
    }
  }
  keyUp (e) {
    if ((e.key === 'ArrowDown' || e.code === 'KeyS')) {
      this.movement.down = false
    }
    if ((e.key === 'ArrowUp' || e.code === 'KeyW')) {
      this.movement.up = false
    }
    if ((e.key === 'ArrowLeft' || e.code === 'KeyA')) {
      this.movement.left = false
    }
    if ((e.key === 'ArrowRight' || e.code === 'KeyD')) {
      this.movement.right = false
    }
  }
  makeMovement () {
    if (this.centeredY !== this.getCenteredPos(this.y) || this.centeredX !== this.getCenteredPos(this.x)) return
    if (this.movement.down && !this.movement.up && this.getCurrentCell().canSouth) {
      this.y++
      this.game.steps++
      this.loseEnergy()
      return // no vertical and horizontal movement at the same time
    }
    if (this.movement.up && !this.movement.down && this.getCurrentCell().canNorth) {
      this.y--
      this.game.steps++
      this.loseEnergy()
      return // no vertical and horizontal movement at the same time
    }
    if (this.movement.left && !this.movement.right && this.getCurrentCell().canWest) {
      this.x--
      this.game.steps++
      this.loseEnergy()
    }
    if (this.movement.right && !this.movement.left && this.getCurrentCell().canEast) {
      this.x++
      this.game.steps++
      this.loseEnergy()
    }
  }
  loseEnergy (howMuch = 0.65) {
    this.energy -= howMuch
    this.visionRange = 100 + this.energy / 1.5
    if (this.energy < 0) this.game.UI.playerDeath()
    if (this.game.day === 1) {
      if (this.energy === 100) this.feelings = ''
      if (this.energy < 100) this.feelings = 'You look around trying to understand where you are'
      if (this.energy <= 80) this.feelings = 'You are starting to get tired'
      if (this.energy <= 70) this.feelings = 'There must be a way out'
      if (this.energy <= 50) this.feelings = 'You are feeling really sleepy'
      if (this.energy <= 10) this.feelings = 'You eyes won\'t be open for much longer'
    } else if (this.game.day === 2) {
      if (this.energy <= 100) this.feelings = 'You feel rested, but everything looks the same'
      if (this.energy <= 80) this.feelings = 'You are starting to get tired again'
      if (this.energy <= 70) this.feelings = 'Is there a way out of this place?'
      if (this.energy <= 50) this.feelings = 'You know you\'re close'
      if (this.energy <= 10) this.feelings = 'You eyes won\'t be open for much longer'
    } else if (this.game.day === 3) {
      if (this.energy <= 100) this.feelings = 'You feel like today is gonna be the day'
      if (this.energy <= 99) this.feelings = 'Will they throwing it back yo you?'
      if (this.energy <= 98) this.feelings = 'By now you shoulda realized what you gotta do'
      if (this.energy <= 97) this.feelings = 'You hear noise in the distance, the exist must be close'
      if (this.energy <= 70) this.feelings = 'Moving is starting to get harder and harder'
      if (this.energy <= 50) this.feelings = 'So close and yet so far'
      if (this.energy <= 10) this.feelings = 'You eyes won\'t be open for much longer'
    }
    document.getElementById('feelingsDiv').innerHTML = this.feelings
  }
  getCurrentCell () {
    return this.game.mazeManager.get(this.x, this.y)
  }
  getCenteredPos (pos) {
    return pos * MazeCell.size + MazeCell.size / 2
  }

  static get size () {
    return 40
  }
}

export default Player
