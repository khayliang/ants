/* eslint-disable import/no-cycle */

import Food from '../Food'
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
    // if no food, find a food to target
    if (this.ant.eye) {
      let objs = []
      objs = this.ant.eye.getNearbyClassInstances(Food)
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
