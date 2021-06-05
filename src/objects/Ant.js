import AntGraphic from './AntGraphic'
import GameObject from './GameObject'
import PheromoneTrail from './PheromoneTrail'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getRandomValue"] }] */
export default class extends GameObject {
  constructor() {
    super(new AntGraphic())
    this.speed = 1
    this.pheromones = new PheromoneTrail()
  }

  setRandomizer(randClosure) {
    this.getRandomValue = randClosure
  }

  getRandomValue() {
    return 0
  }

  sprayPheromone() {
    this.pheromones.add(this.getCoords())
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
