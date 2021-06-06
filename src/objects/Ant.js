import AntGraphic from './AntGraphic'
import GameObject from './GameObject'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getRandomValue"] }] */
export default class extends GameObject {
  constructor({
    getRandomValue = () => 0,
    defaultTrail = null,
    eye = null,
    radians = 0,
    interval = 10,
    viewDistance = 10,
    speed = 1,
  } = {}) {
    super(new AntGraphic())

    this.eye = eye

    this.setRadians(radians)

    this.getRandomValue = getRandomValue
    this.speed = speed
    this.pheromoneInterval = interval
    this.viewDistance = viewDistance
    this.defaultTrail = defaultTrail

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
    if (this.eye) this.eye.getNearbyObjects()
    this.setRadians(this.getRadians() + this.getRandomValue())
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
