import { Graphics } from 'pixi.js'
import '@pixi/graphics-extras'

export default class AntGraphic extends Graphics {
  constructor() {
    super()
    this.beginFill(0xffffff)
    this.drawRegularPolygon(0, 0, 7, 3, 0)
    this.endFill()
    this.zIndex = 1
  }

  setRadians(rad) {
    this.rotation = rad + Math.PI / 2
  }
}
