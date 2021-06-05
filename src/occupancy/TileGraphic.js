import { Graphics } from 'pixi.js'

export default class extends Graphics {
  constructor({ x, y, width, height }) {
    super()
    this.beginFill(0x404040)
    this.drawRect(x, y, width, height)
    this.endFill()
    this.lineStyle(1, 0xffffff)
    this.moveTo(x, y)
    this.lineTo(x + width, y)
    this.lineTo(x + width, y + height)
    this.lineTo(x, y + height)
    this.lineTo(x, y)
    this.alpha = 0.5
  }
}
