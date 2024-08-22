import GameObject from './GameObject'
import NestGraphic from './NestGraphic'

export default class Nest extends GameObject {
  constructor() {
    super(new NestGraphic())
    this.ants = []
    this.foodCount = 0
  }

  addAnt(ant) {
    ant.setCoords(this.getCoords())
    this.ants.push(ant)
  }

  storeFood() {
    this.foodCount += 1
  }
}
