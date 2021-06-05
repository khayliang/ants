import GameObject from '../objects/GameObject'
import TileGraphic from './TileGraphic'

export default class extends GameObject {
  constructor(params) {
    super(new TileGraphic(params))
    this.objects = new Set()
  }

  addObject(obj) {
    this.objects.add(obj)
  }

  getObjects() {
    return [...this.objects]
  }

  removeObject(obj) {
    this.objects.delete(obj)
  }
}
