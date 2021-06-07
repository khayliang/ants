import GameObject from '../objects/GameObject'
import TileGraphic from './TileGraphic'

export default class Tile extends GameObject {
  constructor({ x, y, width, height, tint = 0xff0000 }) {
    super(new TileGraphic({ x, y, width, height }))
    this.objectsMap = {}
    this.tintColor = tint
  }

  addObject(obj) {
    const className = obj.constructor.name
    if (this.objectsMap[className]) this.objectsMap[className].add(obj)
    else {
      this.objectsMap[className] = new Set()
      this.objectsMap[className].add(obj)
    }
  }

  getObjects() {
    this.setTint(this.tintColor)
    return Object.values(this.objectsMap).reduce((arr, set) => {
      return [
        ...arr,
        ...set
      ]
    }, [])
  }

  getInstancesOfClass(classType){
    this.setTint(this.tintColor)
    return [...(this.objectsMap[classType.name] || [])]
  }

  removeObject(obj) {
    const className = obj.constructor.name
    if (this.objectsMap[className]) this.objectsMap[className].delete(obj)
  }

  update() {
    this.resetTint()
  }
}
