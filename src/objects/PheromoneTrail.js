import Pheromone from './Pheromone'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["addChild", "removeChild"] }] */
export default class {
  constructor({ addChild = () => {}, removeChild = () => {}, lifetime } = {}) {
    this.pheromones = []
    this.lifetime = lifetime || 1
    this.addChild = addChild
    this.removeChild = removeChild
  }

  addChild() {}

  removeChild() {}

  add(coords) {
    const pheromone = new Pheromone(coords)
    pheromone.setLifetime(this.lifetime)
    this.pheromones.push(pheromone)
    this.addChild(pheromone.getGraphic())
  }

  getPheromones() {
    return this.pheromones
  }

  update() {
    this.pheromones = this.pheromones.reduce((allPheromones, pheromone) => {
      pheromone.update()
      if (!pheromone.isExpired()) {
        allPheromones.push(pheromone)
        return allPheromones
      }
      this.removeChild(pheromone.getGraphic())
      return allPheromones
    }, [])
  }
}
