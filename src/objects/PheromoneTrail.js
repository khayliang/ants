import Pheromone from './Pheromone'

/* eslint class-methods-use-this: [
  "error", { "exceptMethods": ["addPheromoneToMap", "removePheromoneFromMap"] }
] */
export default class PheromoneTrail {
  constructor({ addPheromoneToMap = () => {}, removePheromoneFromMap = () => {}, lifetime } = {}) {
    this.pheromones = []
    this.lifetime = lifetime || 0
    this.addPheromoneToMap = addPheromoneToMap
    this.removePheromoneFromMap = removePheromoneFromMap
  }

  addPheromoneToMap() {}

  removePheromoneFromMap() {}

  add(coords) {
    if (this.lifetime === 0) return
    const pheromone = new Pheromone(coords)
    pheromone.setLifetime(this.lifetime)
    this.pheromones.push(pheromone)
    this.addPheromoneToMap(pheromone)
  }

  getPheromones() {
    return this.pheromones
  }

  update() {
    this.pheromones = this.pheromones.reduce((allPheromones, pheromone) => {
      if (!pheromone.isExpired()) {
        pheromone.update()
        allPheromones.push(pheromone)
        return allPheromones
      }
      this.removePheromoneFromMap(pheromone)
      return allPheromones
    }, [])
  }
}
