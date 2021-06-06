import getCoordsWithinMap from '../utils/getCoordsWithinMap'
import AntGraphic from './AntGraphic'
import GameObject from './GameObject'
import PheromoneTrail from './PheromoneTrail'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getRandomValue", "getObjectAtCoords"] }] */
export default class extends GameObject {
  constructor({
    mapSize,
    addChild = () => {},
    removeChild = () => {},
    getRandomValue = () => 0,
    getObjectAtCoords = () => [],
    radians = 0,
    interval = 10,
    viewDistance = 10,
    speed = 1,
    trailLength = 10,
  } = {}) {
    super(new AntGraphic())

    this.pheromones = new PheromoneTrail({
      addChild,
      removeChild,
      lifetime: trailLength * interval,
    })

    this.setRadians(radians)

    this.mapSize = mapSize
    this.getRandomValue = getRandomValue
    this.getObjectAtCoords = getObjectAtCoords
    this.speed = speed
    this.pheromoneInterval = interval
    this.viewDistance = viewDistance

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

  getObjectAtCoords() {
    return []
  }

  peekInfront() {
    const coords = this.getCoords()
    const rad = this.getRadians()
    const coordsToPeek = {
      x: coords.x + this.viewDistance * Math.cos(rad),
      y: coords.y + this.viewDistance * Math.sin(rad),
    }
    const boundedCoords = getCoordsWithinMap(coordsToPeek, this.mapSize)
    return this.getObjectAtCoords(boundedCoords)
  }

  sprayPheromone() {
    this.pheromones.add(this.getCoords())
  }

  update() {
    const coords = this.getCoords()
    this.peekInfront()
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
    this.pheromones.update()

    this.updateAmt += 1
    return this
  }
}
