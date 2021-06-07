import { Graphics } from 'pixi.js'

export default class PheromoneFoodGraphic extends Graphics {
  constructor() {
    super()
    this.beginFill(0x4169e1)
    this.drawCircle(0, 0, 3)
    this.endFill()
    this.zIndex = -1
  }
}
