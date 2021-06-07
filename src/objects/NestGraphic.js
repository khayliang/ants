import { Graphics } from 'pixi.js'
import '@pixi/graphics-extras'

export default class NestGraphic extends Graphics {
  constructor() {
    super()
    this.beginFill(0x228b22)
    this.drawCircle(0, 0, 20)
    this.endFill()
    this.zIndex = 1
  }
}
