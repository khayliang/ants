import AntGraphic from './AntGraphic'
import GameObject from './GameObject'

export default class extends GameObject {
  constructor() {
    super(new AntGraphic())
    this.speed = 1
  }

  setRandomizer(randClosure) {
    this.getRandomValue = randClosure
  }

  getRandomValue() {
    return 0
  }

  update() {
    const coords = this.getCoords()
    this.setRadians(this.getRadians() + this.getRandomValue())
    const newCoords = {
      x: coords.x + this.speed * Math.cos(this.getRadians()),
      y: coords.y + this.speed * Math.sin(this.getRadians()),
    }
    this.setCoords(newCoords)
    return this
  }
}
