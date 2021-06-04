export default class {
  constructor() {
    this.pheromones = []
  }

  add(coords) {
    this.pheromones.push(coords)
  }

  getPheromones() {
    return this.pheromones
  }
}
