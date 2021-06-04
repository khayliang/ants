import AntGraphic from './AntGraphic'
import GameObject from './GameObject'

export default class extends GameObject {
  constructor() {
    super(new AntGraphic())
  }
  update() {}
}
