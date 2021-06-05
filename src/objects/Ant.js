import AntGraphic from './AntGraphic'
import GameObject from './GameObject'
import Pheromone from './Pheromone'
import PheromoneTrail from './PheromoneTrail'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getRandomValue"] }] */
export default class extends GameObject {
  constructor(addChild, removeChild) {
    super(new AntGraphic())
    this.speed = 1
    this.pheromones = new PheromoneTrail(addChild, removeChild)
  }

  setRandomizer(randClosure) {
    this.getRandomValue = randClosure
  }

  getRandomValue() {
    return 0
  }

  sprayPheromone() {
    const pheromone = new Pheromone(this.getCoords())
    this.pheromones.add(pheromone)
  }

  update() {
    const coords = this.getCoords()
    this.setRadians(this.getRadians() + this.getRandomValue())
    const newCoords = {
      x: coords.x + this.speed * Math.cos(this.getRadians()),
      y: coords.y + this.speed * Math.sin(this.getRadians()),
    }
    this.setCoords(newCoords)
    this.sprayPheromone()
    this.pheromones.update()
    return this
  }
}
