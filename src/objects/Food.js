import FoodGraphic from './FoodGraphic'
import GameObject from './GameObject'

export default class extends GameObject {
  constructor() {
    super(new FoodGraphic())
  }
}
