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
        return newState.getDirection()
      }
      const radiansDiff = this.ant.radiansDiffFrom(nestCoords)
      return this.ant.getRadians() + radiansDiff * 0.1 + this.ant.getRandomValue()
    }

    const foodPheromones = this.ant.eye.getNearbyClassInstances(PheromoneNavigation)

    let leftPheromoneCount = 0
    let leftRadSum = 0
    let rightPheromoneCount = 0
    let rightRadSum = 0
    let frontPheromoneCount = 0
    let frontRadSum = 0

    let finalRadDiff = 0

    const thresholdRad = this.ant.eye.fov / 3
   
    for(let i = 0; i !== foodPheromones.length; i += 1){
      const pheromone = foodPheromones[i]
      if (!pheromone) console.log("fuck")
       const radDiff = this.ant.radiansDiffFrom(pheromone.getCoords())

      if (radDiff > thresholdRad){
        leftPheromoneCount += 1
        leftRadSum += radDiff 
      } else if (radDiff < -thresholdRad){
        rightPheromoneCount += 1
        rightRadSum += radDiff
      } else {
        frontPheromoneCount += 1
        frontRadSum += radDiff
      }

      if (leftPheromoneCount > rightPheromoneCount && leftPheromoneCount > frontPheromoneCount){
        finalRadDiff = leftRadSum / leftPheromoneCount || 0
      } else if (rightPheromoneCount > leftPheromoneCount && rightPheromoneCount > frontPheromoneCount){
        finalRadDiff = rightRadSum / rightPheromoneCount || 0
      } else {
        finalRadDiff = frontRadSum / frontPheromoneCount || 0
      }
    }
    return this.ant.getRadians() + finalRadDiff * 0.1 + this.ant.getRandomValue()
      
  }
}
