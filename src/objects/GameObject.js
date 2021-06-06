export default class {
  constructor(graphic) {
    this.graphic = graphic
    this.originalTint = graphic.tint
    this.rad = this.graphic.rotation
  }

  getGraphic() {
    return this.graphic
  }

  setCoords({ x, y }) {
    this.graphic.x = x
    this.graphic.y = y
    return this
  }

  setRadians(rad) {
    if (this.graphic.setRadians) this.graphic.setRadians(rad)
    this.rad = rad
    return this
  }

  getRadians() {
    return this.rad
  }

  setTint(hex) {
    this.graphic.tint = hex
    return this
  }

  resetTint() {
    this.graphic.tint = this.originalTint
    return this
  }

  getCoords() {
    return {
      x: this.graphic.x,
      y: this.graphic.y,
    }
  }
}
