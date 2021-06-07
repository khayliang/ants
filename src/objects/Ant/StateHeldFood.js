import PheromoneFood from '../PheromoneFood'

export default class StateHeldFood {
  constructor(ant, food) {
    this.ant = ant
    this.heldFood = food
  }

  sprayPheromone() {
    if (this.ant.trail) this.ant.trail.add(new PheromoneFood(this.ant.getCoords()))
  }

  getDirection() {
    return 0
  }
}
