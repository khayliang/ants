import { Graphics } from 'pixi.js'

export default class extends Graphics {
  constructor({ x, y, width, height }) {
    super()
    this.beginFill(0x404040)
      .drawRect(x, y, width, height)
      .endFill()
      .lineStyle(1, 0xffffff)
      .moveTo(x, y)
      .lineTo(x + width, y)
      .lineTo(x + width, y + height)
      .lineTo(x, y + height)
      .lineTo(x, y)
      .alpha = 0.5
  }
}
