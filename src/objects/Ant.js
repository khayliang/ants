import getCoordsWithinMap from '../utils/getCoordsWithinMap'
import AntGraphic from './AntGraphic'
import Eye from './Eye'
import GameObject from './GameObject'
import PheromoneTrail from './PheromoneTrail'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getRandomValue"] }] */
export default class extends GameObject {
  constructor({
    addPheromone = () => {},
    removePheromone = () => {},
    getRandomValue = () => 0,
    getObjectsAtCoords = () => [],
    mapSize = {width: window.innerWidth, height: window.innerHeight},
    radians = 0,
    interval = 10,
    viewDistance = 10,
    speed = 1,
    trailLength = 10,
    fov = 0.52,
  } = {}) {
    super(new AntGraphic())

    this.pheromones = new PheromoneTrail({
      addPheromone,
      removePheromone,
      lifetime: trailLength * interval,
    })
    this.eye = new Eye({ object: this, getObjectsAtCoords, viewDistance, fov })

    this.setRadians(radians)

    this.getRandomValue = getRandomValue
    this.speed = speed
    this.pheromoneInterval = interval
    this.viewDistance = viewDistance
    this.mapSize = mapSize

    this.updateAmt = 0
  }

  setRandomizer(randClosure) {
    this.getRandomValue = randClosure
  }

  setPheromoneInterval(interval) {
    this.pheromoneInterval = interval
  }

  getRandomValue() {
    return 0
  }

  sprayPheromone() {
    this.pheromones.add(this.getCoords())
  }

  update() {
    const coords = this.getCoords()
    this.eye.getNearbyObjects()
    this.setRadians(this.getRadians() + this.getRandomValue())
    const newCoords = getCoordsWithinMap({
      x: coords.x + this.speed * Math.cos(this.getRadians()),
      y: coords.y + this.speed * Math.sin(this.getRadians()),
    }, this.mapSize)
    this.setCoords(newCoords)

    if (this.updateAmt % this.pheromoneInterval === 0) {
      this.sprayPheromone()
      this.updateAmt = 0
    }
    this.pheromones.update()

    this.updateAmt += 1
    return this
  }
}
