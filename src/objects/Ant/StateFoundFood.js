/* eslint-disable import/no-cycle */

import calculateDistanceBetweenCoords from '../../utils/calcDistanceBetweenCoords'
import flipRadians from '../../utils/flipRadians'
import PheromoneNavigation from '../PheromoneNavigation'
import StateHeldFood from './StateHeldFood'
import StateNoFood from './StateNoFood'

export default class StateFoundFood {
  constructor(ant, food) {
    this.ant = ant
    this.targetFood = food
  }

  sprayPheromone() {
    if (this.ant.trail) this.ant.trail.add(new PheromoneNavigation(this.ant.getCoords()))
  }

  getDirection() {
    if (!this.targetFood.isTaken()) {
      const foodCoords = this.targetFood.getCoords()
      const antCoords = this.ant.getCoords()
      if (calculateDistanceBetweenCoords(foodCoords, antCoords) < this.ant.reachDistance) {
        this.targetFood.take()
        const newState = new StateHeldFood(this.ant, this.food)
        // const newState = new StateNoFood(this.ant)
        this.ant.setState(newState)
        return flipRadians(this.ant.getRadians())
      }
      const radiansDiff = this.ant.radiansDiffFrom(foodCoords)
      return this.ant.getRadians() + radiansDiff * 0.7 + this.ant.getRandomValue()
    }
    const newState = new StateNoFood(this.ant)
    this.ant.setState(newState)
    return newState.getDirection()
  }
}
