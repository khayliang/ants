/* eslint-disable import/no-cycle */

import Pheromone from '../Pheromone'
import StateFoundFood from './StateFoundFood'

export default class StateNoFood {
  constructor(ant) {
    this.ant = ant
  }

  sprayPheromone() {
    if (this.ant.trail) this.ant.trail.add(new Pheromone(this.ant.getCoords()))
  }

  getDirection() {
    // if no food, find a food to target
    if (this.ant.eye) {
      const objs = this.ant.eye.getNearbyObjects()
      for (let i = 0; i !== objs.length; i += 1) {
        const obj = objs[i]
        if (obj.constructor.name === 'Food') {
          const newState = new StateFoundFood(this.ant, obj)
          this.ant.setState(newState)
          return newState.getDirection()
        }
      }
    }
    return this.ant.getRadians() + this.ant.getRandomValue()
  }
}
