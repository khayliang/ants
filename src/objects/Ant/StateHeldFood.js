import calculateDistanceBetweenCoords from '../../utils/calcDistanceBetweenCoords'
import flipRadians from '../../utils/flipRadians'
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
    if (this.ant.trail) this.ant.trail.add(new PheromoneFood({ coords: this.ant.getCoords() }))
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
        return flipRadians(this.ant.getRadians())
      }
      const radiansDiff = this.ant.radiansDiffFrom(nestCoords)
      return this.ant.getRadians() + radiansDiff * this.ant.turnSpeed + this.ant.getRandomValue()
    }

    const pheromones = this.ant.eye.getNearbyClassInstances(PheromoneNavigation)

    return (
      this.ant.getRadians() +
      this.ant.getStrongestPheromoneDirection(pheromones) * this.ant.turnSpeed +
      this.ant.getRandomValue()
    )
  }
}
