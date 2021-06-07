import calculateDistanceBetweenCoords from '../../utils/calcDistanceBetweenCoords'
import Pheromone from '../Pheromone'
import HeldFoodState from './HeldFoodState'
import NoFoodState from './NoFoodState'

export default class FoundFoodState {
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
        const newState = new HeldFoodState(this.ant, this.food)
        this.ant.setState(newState)
        return newState.getDirection()
      }
      const radiansDiff =
        Math.atan2(-foodCoords.y + antCoords.y, -foodCoords.x + antCoords.x) + Math.PI
      return radiansDiff
    }
    const newState = new NoFoodState(this.ant)
    this.ant.setState(newState)
    return newState.getDirection()
  }
}
