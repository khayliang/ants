import Pheromone from './Pheromone'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["addObject", "removeObject"] }] */
export default class {
  constructor({ addObject = () => {}, removeObject = () => {}, lifetime } = {}) {
    this.pheromones = []
    this.lifetime = lifetime || 1
    this.addObject = addObject
    this.removeObject = removeObject
  }

  addObject() {}

  removeObject() {}

  add(coords) {
    const pheromone = new Pheromone(coords)
    pheromone.setLifetime(this.lifetime)
    this.pheromones.push(pheromone)
    this.addObject(pheromone)
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
      this.removeObject(pheromone)
      return allPheromones
    }, [])
  }
}
