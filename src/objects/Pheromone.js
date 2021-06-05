import GameObject from './GameObject'
import PheremoneGraphic from './PheremoneGraphic'

export default class extends GameObject {
  constructor(coords = { x: 0, y: 0 }) {
    super(new PheremoneGraphic())
    this.lifetime = 100
    this.age = 0
    this.setCoords(coords)
  }

  update() {
    this.age += 1
    return this
  }

  isExpired() {
    return this.age === this.lifetime
  }

  setLifetime(lifetime) {
    this.lifetime = lifetime
  }
}
