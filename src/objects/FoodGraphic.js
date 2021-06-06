import { Graphics } from 'pixi.js'

export default class extends Graphics {
  constructor() {
    super()
    this.beginFill(0x710193)
    this.drawCircle(0, 0, 5)
    this.endFill()
    this.zIndex = -1
  }
}
