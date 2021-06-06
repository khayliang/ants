/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getObjectsAtCoords"] }] */

export default class Eye {
  constructor({ object, getObjectsAtCoords, viewDistance = 10, fov = 0.52 }) {
    this.object = object
    this.viewDistance = viewDistance
    this.fov = fov

    this.getObjectsAtCoords = getObjectsAtCoords
  }

  getObjectsAtCoords() {
    return []
  }

  getNearbyObjects() {
    const currCoords = this.object.getCoords()
    const currRad = this.object.getRadians()
    return [
      ...this.getObjectsAtCoords(currCoords),
      ...this.getObjectsAtCoords({
        x: currCoords.x + this.viewDistance * Math.cos(currRad),
        y: currCoords.y + this.viewDistance * Math.sin(currRad),
      }),
      ...this.getObjectsAtCoords({
        x: currCoords.x + this.viewDistance * Math.cos(currRad + this.fov),
        y: currCoords.y + this.viewDistance * Math.sin(currRad + this.fov),
      }),
      ...this.getObjectsAtCoords({
        x: currCoords.x + this.viewDistance * Math.cos(currRad - this.fov),
        y: currCoords.y + this.viewDistance * Math.sin(currRad - this.fov),
      }),
    ]
  }
}
