/* eslint-disable import/no-cycle */

import calculateDistanceBetweenCoords from '../../utils/calcDistanceBetweenCoords'
import Pheromone from '../Pheromone'
import StateHeldFood from './StateHeldFood'
import StateNoFood from './StateNoFood'

export default class StateFoundFood {
  constructor(ant, food) {
    this.ant = ant
    this.targetFood = food
  }

  sprayPheromone() {
    if (this.ant.trail) this.ant.trail.add(new Pheromone(this.ant.getCoords()))
  }

  getDirection() {
    if (!this.targetFood.isTaken()) {
      const foodCoords = this.targetFood.getCoords()
      const antCoords = this.ant.getCoords()
      if (calculateDistanceBetweenCoords(foodCoords, antCoords) < this.ant.reachDistance) {
        this.targetFood.take()
        const newState = new StateHeldFood(this.ant, this.food)
        this.ant.setState(newState)
        return newState.getDirection()
      }
      const radiansDiff =
        Math.atan2(-foodCoords.y + antCoords.y, -foodCoords.x + antCoords.x) + Math.PI
      return radiansDiff
    }
    const newState = new StateNoFood(this.ant)
    this.ant.setState(newState)
    return newState.getDirection()
  }
}
