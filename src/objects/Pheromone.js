import GameObject from './GameObject'
import PheremoneGraphic from './PheremoneGraphic'

export default class extends GameObject {
  constructor() {
    super(new PheremoneGraphic())
    this.lifetime = 5
    this.age = 0
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
