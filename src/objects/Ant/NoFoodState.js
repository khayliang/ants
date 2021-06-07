import calculateDistanceBetweenCoords from "../../utils/calcDistanceBetweenCoords"
import Pheromone from "../Pheromone"

export default class NoFoodState {
  constructor(ant){
    this.ant = ant
  }
  sprayPheromone(){
    if (this.ant.defaultTrail) this.ant.defaultTrail.add(new Pheromone(this.ant.getCoords()))
  }
  getDirection(){
    // if no food, find a food to target
    if (this.ant.eye && !this.ant.targetFood) {
      const objs = this.ant.eye.getNearbyObjects()
      for (const obj of objs) {
        if (obj.constructor.name === 'Food') {
          if (obj.isTaken()) continue
          this.ant.targetFood = obj
          break
        }
      }
    }

    // if food targeted, turn to find food
    if (this.ant.targetFood) {
      if (!this.ant.targetFood.isTaken()) {
        if (
          calculateDistanceBetweenCoords(this.ant.targetFood.getCoords(), this.ant.getCoords()) <
          this.ant.reachDistance
        ) {
          this.ant.targetFood.take()
          this.ant.heldFood = this.ant.targetFood
          this.ant.targetFood = null
        } else {
          const foodCoords = this.ant.targetFood.getCoords()
          const myCoords = this.ant.getCoords()
          const radiansDiff =
            Math.atan2(-foodCoords.y + myCoords.y, -foodCoords.x + myCoords.x) + Math.PI
          return(radiansDiff)
        }
      } else {
        this.ant.targetFood = null
      }
    }

    if (!this.ant.targetFood) {
      return(this.ant.getRadians() + this.ant.getRandomValue())
    }

    return 2
  } 
}