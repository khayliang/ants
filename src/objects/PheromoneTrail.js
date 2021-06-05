import PheremoneGraphic from './PheremoneGraphic'
import Pheromone from './Pheromone'

export default class {
  constructor(addChild) {
    this.pheromones = []
    if (addChild) this.addChild = addChild
  }

  addChild() {}

  removeChild() {}

  add(coords) {
    const pheromone = new Pheromone()
    pheromone.setCoords(coords)
    this.pheromones.push(pheromone)
    this.addChild(pheromone.getGraphic())
  }

  getPheromones() {
    return this.pheromones
  }
}
