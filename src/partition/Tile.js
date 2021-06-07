import GameObject from '../objects/GameObject'
import TileGraphic from './TileGraphic'

export default class Tile extends GameObject {
  constructor({ x, y, width, height, tint = 0xff0000 }) {
    super(new TileGraphic({ x, y, width, height }))
    this.objects = new Set()
    this.tintColor = tint
  }

  addObject(obj) {
    this.objects.add(obj)
  }

  getObjects() {
    this.setTint(this.tintColor)
    return [...this.objects]
  }

  removeObject(obj) {
    this.objects.delete(obj)
  }

  update() {
    this.resetTint()
  }
}
