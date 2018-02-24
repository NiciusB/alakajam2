class MazeCell {
  constructor (mazeBuilder, x, y, internalMazeCell) {
    this.mazeBuilder = mazeBuilder
    this.ctx = this.mazeBuilder.ctx
    this.x = x
    this.y = y
    this.canEast = !internalMazeCell.right
    this.canWest = !internalMazeCell.left
    this.canNorth = !internalMazeCell.top
    this.canSouth = !internalMazeCell.bottom
    this.size = this.constructor.size
  }
  east () {
    return this.canEast ? this.get(this.x + 1, this.y) : this
  }
  west () {
    return this.canWest ? this.get(this.x - 1, this.y) : this
  }
  north () {
    return this.canNorth ? this.get(this.x, this.y - 1) : this
  }
  south () {
    return this.canSouth ? this.get(this.x, this.y + 1) : this
  }
  draw () {
    this.drawBody()
    // this.drawCoordinates()
    this.ctx.save()
    this.ctx.fillStyle = '#fff'
    if (!this.canWest) this.ctx.fillRect(this.x * this.size, this.y * this.size, 2, this.size)
    if (!this.canEast) this.ctx.fillRect(this.x * this.size + this.size - 2, this.y * this.size, 2, this.size)
    if (!this.canNorth) this.ctx.fillRect(this.x * this.size, this.y * this.size, this.size, 2)
    if (!this.canSouth) this.ctx.fillRect(this.x * this.size, this.y * this.size + this.size - 2, this.size, 2)
    this.ctx.restore()
  }
  drawBody () {
    this.drawCoordinates()
    this.ctx.save()
    this.ctx.fillStyle = '#FFB6C1'
    this.ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size)
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
  static get size () {
    return 40
  }
}

export default MazeCell
