import FoodGraphic from './FoodGraphic'
import GameObject from './GameObject'

export default class Food extends GameObject {
  constructor({ onTake = () => null } = {}) {
    super(new FoodGraphic())
    this.taken = false
    this.onTake = onTake
  }

  onTake() {}

  take() {
    this.taken = true
    this.onTake(this)
    return this
  }

  isTaken() {
    return this.taken
  }
}
