import Pheromone from './Pheromone'
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["addChild", "removeChild"] }] */
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
