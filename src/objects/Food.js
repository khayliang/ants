import FoodGraphic from './FoodGraphic'
import GameObject from './GameObject'

/* eslint class-methods-use-this: [
  "error", { "exceptMethods": ["onTake"] }
] */
export default class Food extends GameObject {
  constructor({ onTake = () => null } = {}) {
    super(new FoodGraphic())
    this.taken = false
    this.onTake = onTake
  }

  onTake() {}

  take() {
    this.taken = true
    this.onTake()
    return this
  }

  isTaken() {
    return this.taken
  }
}
