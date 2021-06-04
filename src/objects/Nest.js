import GameObject from './GameObject'
import NestGraphic from './NestGraphic'

export default class extends GameObject {
  constructor() {
    super(new NestGraphic())
    this.ants = []
  }

  addAnt(ant) {
    ant.setCoords(this.getCoords())
    this.ants.push(ant)
  }
}
