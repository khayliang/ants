import { isEqual } from 'lodash'
import calculateDistanceBetweenCoords from '../utils/calcDistanceBetweenCoords'
import AntGraphic from './AntGraphic'
import GameObject from './GameObject'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getRandomValue"] }] */
export default class Ant extends GameObject {
  constructor({
    getRandomValue = () => 0,
    defaultTrail = null,
    eye = null,
    initialRadians = 0,
    interval = 10,
    speed = 1,
    reachDistance = 1,
  } = {}) {
    super(new AntGraphic())

    this.eye = eye

    this.setRadians(initialRadians)

    this.getRandomValue = getRandomValue
    this.speed = speed
    this.pheromoneInterval = interval
    this.defaultTrail = defaultTrail
    this.reachDistance = reachDistance

    this.targetFood = null
    this.heldFood = null
    this.updateAmt = 0
  }

  setEye(eye) {
    this.eye = eye
    return this
  }

  getRandomValue() {
    return 0
  }

  sprayPheromone() {
    if (this.defaultTrail) this.defaultTrail.add(this.getCoords())
  }

  updatePheromoneTrails() {
    if (this.defaultTrail) this.defaultTrail.update()
  }

  update() {
    const coords = this.getCoords()
    // if no food, find a food to target
    if (this.eye && !this.targetFood) {
      const objs = this.eye.getNearbyObjects()
      for (const obj of objs) {
        if (obj.constructor.name === 'Food') {
          if (obj.isTaken()) continue
          this.targetFood = obj
          break
        }
      }
    }

    // if food targeted, turn to find food
    if (this.targetFood) {
      if (!this.targetFood.isTaken()) {
        if (calculateDistanceBetweenCoords(this.targetFood.getCoords(), this.getCoords()) < this.reachDistance) {
          this.targetFood.take()
          this.heldFood = this.targetFood
          this.targetFood = null
        } else {
          const foodCoords = this.targetFood.getCoords()
          const myCoords = this.getCoords()
          const radiansDiff =
            Math.atan2(-foodCoords.y + myCoords.y, -foodCoords.x + myCoords.x) + Math.PI
          this.setRadians(radiansDiff)
        }
      } else {
        this.targetFood = null
      }
    }

    if (!this.targetFood) {
      this.setRadians(this.getRadians() + this.getRandomValue())
    }

    const newCoords = {
      x: coords.x + this.speed * Math.cos(this.getRadians()),
      y: coords.y + this.speed * Math.sin(this.getRadians()),
    }
    this.setCoords(newCoords)

    if (this.updateAmt % this.pheromoneInterval === 0) {
      this.sprayPheromone()
      this.updateAmt = 0
    }
    this.updatePheromoneTrails()

    this.updateAmt += 1
    return this
  }
}
