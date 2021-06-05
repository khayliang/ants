/* eslint class-methods-use-this: ["error", { "exceptMethods": ["addChild", "removeChild"] }] */
export default class {
  constructor(addChild, removeChild) {
    this.pheromones = []
    if (addChild) this.addChild = addChild
    if (removeChild) this.removeChild = removeChild
  }

  addChild() {}

  removeChild() {}

  add(pheromone) {
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
