import Pheromone from './Pheromone'

/* eslint class-methods-use-this: [
  "error", { "exceptMethods": ["onPheromoneAdd", "onPheromoneExpire"] }
] */
export default class PheromoneTrail {
  constructor({ onPheromoneAdd = () => {}, onPheromoneExpire = () => {}, lifetime } = {}) {
    this.pheromones = []
    this.lifetime = lifetime || 0
    this.onPheromoneAdd = onPheromoneAdd
    this.onPheromoneExpire = onPheromoneExpire
  }

  onPheromoneAdd() {}

  onPheromoneExpire() {}

  add(coords) {
    if (this.lifetime === 0) return
    const pheromone = new Pheromone(coords)
    pheromone.setLifetime(this.lifetime)
    this.pheromones.push(pheromone)
    this.onPheromoneAdd(pheromone)
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
      this.onPheromoneExpire(pheromone)
      return allPheromones
    }, [])
  }
}
