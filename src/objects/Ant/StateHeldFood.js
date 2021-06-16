import calculateDistanceBetweenCoords from '../../utils/calcDistanceBetweenCoords'
import Nest from '../Nest'
import PheromoneFood from '../PheromoneFood'
import PheromoneNavigation from '../PheromoneNavigation'
import StateNoFood from './StateNoFood'

export default class StateHeldFood {
  constructor(ant, food) {
    this.ant = ant
    this.heldFood = food
  }

  sprayPheromone() {
    if (this.ant.trail) this.ant.trail.add(new PheromoneFood(this.ant.getCoords()))
  }

  getDirection() {
    const [nest] = this.ant.eye.getNearbyClassInstances(Nest)
    if (nest) {
      const nestCoords = nest.getCoords()
      const antCoords = this.ant.getCoords()
      if (calculateDistanceBetweenCoords(nestCoords, antCoords) < this.ant.reachDistance) {
        nest.storeFood(this.heldFood)
        const newState = new StateNoFood(this.ant)
        // const newState = new StateNoFood(this.ant)
        this.ant.setState(newState)
        return this.ant.getRadians() - Math.PI
      }
      const radiansDiff = this.ant.radiansDiffFrom(nestCoords)
      return this.ant.getRadians() + radiansDiff * 0.1 + this.ant.getRandomValue()
    }

    const pheromones = this.ant.eye.getNearbyClassInstances(PheromoneNavigation)
    
    return this.ant.getRadians() + this.ant.getStrongestPheromoneRadDiff(pheromones) * 0.1 + this.ant.getRandomValue()
      
  }
}
