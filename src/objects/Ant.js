import AntGraphic from './AntGraphic'
import GameObject from './GameObject'

export default class extends GameObject {
  constructor() {
    super(new AntGraphic())
    this.rad = 0
    this.speed = 1
  }
  setRadians(rad) {
    this.rad = rad
  }
  update() {
    const coords = this.getCoords()
    const newCoords = {
      x: coords.x + this.speed * Math.sin(this.rad),
      y: coords.y + this.speed * Math.cos(this.rad),
    }
    this.setCoords(newCoords)
    return this
  }
}
