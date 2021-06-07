import calculateDistanceBetweenCoords from '../../utils/calcDistanceBetweenCoords'
import Pheromone from '../Pheromone'
import FoundFoodState from './FoundFoodState'

export default class NoFoodState {
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
      for (const obj of objs) {
        if (obj.constructor.name === 'Food') {
          if (obj.isTaken()) continue
          const newState = new FoundFoodState(this.ant, obj)
          this.ant.setState(newState)
          return newState.getDirection()
        }
      }
    }
    return this.ant.getRadians() + this.ant.getRandomValue()
  }
}
