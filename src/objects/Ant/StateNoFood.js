/* eslint-disable import/no-cycle */

import Food from '../Food'
import PheromoneFood from '../PheromoneFood'
import PheromoneNavigation from '../PheromoneNavigation'
import StateFoundFood from './StateFoundFood'

export default class StateNoFood {
  constructor(ant) {
    this.ant = ant
  }

  sprayPheromone() {
    if (this.ant.trail) this.ant.trail.add(new PheromoneNavigation(this.ant.getCoords()))
  }

  getDirection() {
    if (this.ant.eye) {
      const [food] = this.ant.eye.getNearbyClassInstances(Food)
      if (food) {
        const newState = new StateFoundFood(this.ant, food)
        this.ant.setState(newState)
        return newState.getDirection()
      } else {
        const foodPheromones = this.ant.eye.getNearbyClassInstances(PheromoneFood)

        
        return this.ant.getRadians() + this.ant.getStrongestPheromoneDirection(foodPheromones) * 0.1 + this.ant.getRandomValue()
      }
    }
    return this.ant.getRadians() + this.ant.getRandomValue()
  }
}
