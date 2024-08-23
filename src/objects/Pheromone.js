import GameObject from './GameObject'
import PheremoneGraphic from './PheremoneGraphic'

export default class Pheromone extends GameObject {
  constructor({ coords = { x: 0, y: 0 }, lifetime = 1, graphics = new PheremoneGraphic() } = {}) {
    super(graphics)
    this.lifetime = lifetime
    this.age = 0
    this.setCoords(coords)
  }

  update() {
    this.age += 1
    this.getGraphic().alpha = 1 - this.age / this.lifetime
    return this
  }

  isExpired() {
    return this.age === this.lifetime
  }

  setLifetime(lifetime) {
    this.lifetime = lifetime
  }

  getStrength() {
    return 1 - this.age / this.lifetime
  }
}
