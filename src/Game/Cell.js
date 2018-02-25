import AStar from './AStar'

class MazeCell {
  constructor (game, x, y, internalMazeCell) {
    this.game = game
    this.ctx = this.game.ctx
    this.x = x
    this.y = y
    this.canEast = !internalMazeCell.right
    this.canWest = !internalMazeCell.left
    this.canNorth = !internalMazeCell.top
    this.canSouth = !internalMazeCell.bottom
    this.size = this.constructor.size
    this.sprite = this.game.Rand.randFromTo(0, 40)
    if (this.sprite > 4) this.sprite = 0
  }
  toString () {
    return `${this.x}.${this.y}`
  }
  east () {
    return this.canEast ? this.game.mazeManager.get(this.x + 1, this.y) : this
  }
  west () {
    return this.canWest ? this.game.mazeManager.get(this.x - 1, this.y) : this
  }
  north () {
    return this.canNorth ? this.game.mazeManager.get(this.x, this.y - 1) : this
  }
  south () {
    return this.canSouth ? this.game.mazeManager.get(this.x, this.y + 1) : this
  }
  distanceToCell (otherCell) {
    const search = new AStar().cellToCell(this, otherCell)
    return search.path.length
  }
  draw () {
    this.drawBody()
    // this.drawCoordinates()
    this.drawWalls()
  }
  drawBody () {
    this.ctx.save()
    this.ctx.drawImage(this.game.sprites.bg, this.sprite * this.size, 0, this.size, this.size, this.x * this.size, this.y * this.size, this.size, this.size)
    this.ctx.restore()
  }
  drawCoordinates () {
    this.ctx.save()
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = '#a1a1a1'
    this.ctx.fillText(`${this.x}.${this.y}`, this.x * this.size + this.size / 2, this.y * this.size + this.size / 2)
    this.ctx.restore()
  }
  drawWalls () {
    this.ctx.save()
    this.ctx.fillStyle = '#2f3230'
    if (!this.canWest) this.ctx.fillRect(this.x * this.size, this.y * this.size, 2, this.size)
    if (!this.canEast) this.ctx.fillRect(this.x * this.size + this.size - 2, this.y * this.size, 2, this.size)
    if (!this.canNorth) this.ctx.fillRect(this.x * this.size, this.y * this.size, this.size, 2)
    if (!this.canSouth) this.ctx.fillRect(this.x * this.size, this.y * this.size + this.size - 2, this.size, 2)
    this.ctx.restore()
  }
  static get size () {
    return 40
  }
}

export default MazeCell
