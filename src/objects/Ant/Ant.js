import AntGraphic from './AntGraphic'
import GameObject from '../GameObject'
import StateNoFood from './StateNoFood'
import PheromoneTrail from '../PheromoneTrail'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getRandomValue"] }] */
export default class Ant extends GameObject {
  constructor({
    getRandomValue = () => 0,
    trail = new PheromoneTrail(),
    eye = null,
    initialRadians = 0,
    interval = 10,
    speed = 1,
    reachDistance = 1,
  } = {}) {
    super(new AntGraphic())

    this.state = new StateNoFood(this)

    this.eye = eye
    this.trail = trail

    this.setRadians(initialRadians)

    this.getRandomValue = getRandomValue
    this.speed = speed
    this.pheromoneInterval = interval
    this.reachDistance = reachDistance

    this.targetFood = null
    this.heldFood = null
    this.updateAmt = 0
  }

  setEye(eye) {
    this.eye = eye
    return this
  }

  setState(state) {
    this.state = state
    return this
  }

  getRandomValue() {
    return 0
  }

  sprayPheromone() {
    this.state.sprayPheromone()
  }

  getNewDirection() {
    return this.state.getDirection()
  }

  getStrongestPheromoneRadDiff(pheromones) {
    let leftPheromoneCount = 0
    let leftPheromoneStrength = 0
    let leftRadSum = 0
    let rightPheromoneCount = 0
    let rightPheromoneStrength = 0
    let rightRadSum = 0
    let frontPheromoneCount = 0
    let frontPheromoneStrength = 0
    let frontRadSum = 0

    let finalRadDiff = 0

    const thresholdRad = this.eye.fov / 3

    for(let i = 0; i !== pheromones.length; i += 1){
      const pheromone = pheromones[i]
      const radDiff = this.radiansDiffFrom(pheromone.getCoords())
      if (radDiff > thresholdRad && radDiff < this.eye.fov){
        rightPheromoneCount += 1
        rightRadSum += radDiff
        rightPheromoneStrength += pheromone.getStrength()
      } else if (radDiff < -thresholdRad && radDiff > -this.eye.fov){
        leftPheromoneCount += 1
        leftRadSum += radDiff 
        leftPheromoneStrength += pheromone.getStrength()
      } else if (radDiff > -thresholdRad && radDiff < thresholdRad){
        frontPheromoneCount += 1
        frontRadSum += radDiff
        frontPheromoneStrength += pheromone.getStrength()
      }

      if (leftPheromoneStrength > rightPheromoneStrength && leftPheromoneStrength > frontPheromoneStrength){
        finalRadDiff = leftRadSum / leftPheromoneCount || 0
      } else if (rightPheromoneStrength > leftPheromoneStrength && rightPheromoneCount > frontPheromoneStrength){
        finalRadDiff = rightRadSum / rightPheromoneCount || 0
      } else {
        finalRadDiff = frontRadSum / frontPheromoneCount || 0
      }
    }
    return finalRadDiff
  }

  update() {
    const direction = this.getNewDirection()
    const coords = this.getCoords()

    const newCoords = {
      x: coords.x + this.speed * Math.cos(direction),
      y: coords.y + this.speed * Math.sin(direction),
    }
    this.setCoords(newCoords)
    this.setRadians(direction)

    if (this.updateAmt % this.pheromoneInterval === 0) {
      this.sprayPheromone()
      this.updateAmt = 0
    }

    this.trail.update()

    this.updateAmt += 1
    return this
  }
}
