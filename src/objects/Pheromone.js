import GameObject from './GameObject'
import PheremoneGraphic from './PheremoneGraphic'

export default class Pheromone extends GameObject {
  constructor({ 
    coords = { x: 0, y: 0 }, 
    lifetime = 1, 
    maxStrength = 1,
    graphics = new PheremoneGraphic() 
  } = {}) {
    super(graphics)
    this.lifetime = lifetime
    this.age = 0
    this.setCoords(coords)
    // range from 0 to 1
    this.maxStrength = maxStrength
  }

  update() {
    this.age += 1
    this.getGraphic().alpha = this.getStrength()
    return this
  }

  isExpired() {
    return this.age === this.lifetime
  }

  setLifetime(lifetime) {
    this.lifetime = lifetime
  }

  getStrength() {
    return this.maxStrength - ((this.age / this.lifetime) * this.maxStrength)
  }
}
