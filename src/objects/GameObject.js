import getCoordsWithinMap from '../utils/getCoordsWithinMap'

export default class GameObject {
  constructor(graphic, mapSize = { width: window.innerWidth, height: window.innerHeight }) {
    this.graphic = graphic
    this.originalTint = graphic.tint
    this.rad = this.graphic.rotation
    this.mapSize = mapSize
  }

  getGraphic() {
    return this.graphic
  }

  setCoords(coords) {
    const { x, y } = getCoordsWithinMap(coords, this.mapSize)
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

  radiansDiffFrom(coords) {
    const myCoords = this.getCoords()
    const absoluteRadians = Math.atan2(coords.y - myCoords.y, coords.x - myCoords.x)
    const radiansDiff = absoluteRadians - this.getRadians()
    return radiansDiff
  }
}
