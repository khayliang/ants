import calculateDistanceBetweenCoords from '../../utils/calcDistanceBetweenCoords'
import AntGraphic from './AntGraphic'
import GameObject from '../GameObject'
import NoFoodState from './NoFoodState'

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

    this.state = new NoFoodState(this)

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

  getNewDirection(){
    return this.state.getDirection()
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
    this.updatePheromoneTrails()

    this.updateAmt += 1
    return this
  }
}
