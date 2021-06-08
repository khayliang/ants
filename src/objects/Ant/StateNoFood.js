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
    return this.ant.getRadians() + this.ant.getRandomValue()
  }
}
