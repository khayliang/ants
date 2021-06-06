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
    return [...this.getObjectsInfront(), ...this.getObjectsLeft(), ...this.getObjectsRight()]
  }

  getObjectsInfront() {
    const currCoords = this.object.getCoords()
    const currRad = this.object.getRadians()
    const coordsToGet = {
      x: currCoords.x + this.viewDistance * Math.cos(currRad),
      y: currCoords.y + this.viewDistance * Math.sin(currRad),
    }
    return this.getObjectsAtCoords(coordsToGet)
  }

  getObjectsLeft() {
    const currCoords = this.object.getCoords()
    const currRad = this.object.getRadians()
    const coordsToGet = {
      x: currCoords.x + this.viewDistance * Math.cos(currRad + this.fov),
      y: currCoords.y + this.viewDistance * Math.sin(currRad + this.fov),
    }
    return this.getObjectsAtCoords(coordsToGet)
  }

  getObjectsRight() {
    const currCoords = this.object.getCoords()
    const currRad = this.object.getRadians()
    const coordsToGet = {
      x: currCoords.x + this.viewDistance * Math.cos(currRad - this.fov),
      y: currCoords.y + this.viewDistance * Math.sin(currRad - this.fov),
    }
    return this.getObjectsAtCoords(coordsToGet)
  }
}
