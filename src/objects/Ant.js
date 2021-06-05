import AntGraphic from './AntGraphic'
import GameObject from './GameObject'
import Pheromone from './Pheromone'
import PheromoneTrail from './PheromoneTrail'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getRandomValue"] }] */
export default class extends GameObject {
  constructor(addChild, removeChild) {
    super(new AntGraphic())
    this.speed = 1
    this.pheromones = new PheromoneTrail(addChild, removeChild, 100)
    this.pheromoneInterval = 10
    this.updateAmt = 0
  }

  setRandomizer(randClosure) {
    this.getRandomValue = randClosure
  }

  setPheromoneInterval(interval) {
    this.pheromoneInterval = interval
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

    if (this.updateAmt % this.pheromoneInterval === 0) {
      this.sprayPheromone()
      this.updateAmt = 0
    }
    this.pheromones.update()

    this.updateAmt += 1
    return this
  }
}
