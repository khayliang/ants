import { Graphics } from 'pixi.js'

export default class extends Graphics {
  constructor() {
    super()
    this.beginFill(0xffa500)
    this.drawCircle(0, 0, 3)
    this.endFill()
    this.zIndex = -1
  }
}
