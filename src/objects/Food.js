import FoodGraphic from './FoodGraphic'
import GameObject from './GameObject'

export default class Food extends GameObject {
  constructor() {
    super(new FoodGraphic())
    this.taken = false
  }

  take() {
    this.taken = true
    return this
  }

  isTaken() {
    return this.taken
  }
}
