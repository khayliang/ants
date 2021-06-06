import Pheromone from './Pheromone'

/* eslint class-methods-use-this: [
  "error", { "exceptMethods": ["addPheromone", "removePheromone"] }
] */
export default class {
  constructor({ addPheromone = () => {}, removePheromone = () => {}, lifetime } = {}) {
    this.pheromones = []
    this.lifetime = lifetime || 1
    this.addPheromone = addPheromone
    this.removePheromone = removePheromone
  }

  addPheromone() {}

  removePheromone() {}

  add(coords) {
    const pheromone = new Pheromone(coords)
    pheromone.setLifetime(this.lifetime)
    this.pheromones.push(pheromone)
    this.addPheromone(pheromone)
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
      this.removePheromone(pheromone)
      return allPheromones
    }, [])
  }
}
