/* eslint class-methods-use-this: ["error", { "exceptMethods": [
  "getObjectsAtCoords",
  "getClassInstancesAtCoords"
] }] */

export default class Eye {
  constructor({
    object,
    getObjectsAtCoords,
    getClassInstancesAtCoords,
    viewDistance = 10,
    fov = 0.52,
  }) {
    this.object = object
    this.viewDistance = viewDistance
    this.fov = fov

    this.getObjectsAtCoords = getObjectsAtCoords
    this.getClassInstancesAtCoords = getClassInstancesAtCoords
  }

  getObjectsAtCoords() {
    return []
  }

  getClassInstancesAtCoords() {
    return []
  }

  getNearbyObjects() {
    const currCoords = this.object.getCoords()
    const currRad = this.object.getRadians()
    return this.getObjectsAtCoords([
      currCoords,
      {
        x: currCoords.x + this.viewDistance * Math.cos(currRad),
        y: currCoords.y + this.viewDistance * Math.sin(currRad),
      },
      {
        x: currCoords.x + this.viewDistance * Math.cos(currRad + this.fov),
        y: currCoords.y + this.viewDistance * Math.sin(currRad + this.fov),
      },
      {
        x: currCoords.x + this.viewDistance * Math.cos(currRad - this.fov),
        y: currCoords.y + this.viewDistance * Math.sin(currRad - this.fov),
      },
    ])
  }

  getNearbyClassInstances(classType) {
    const currCoords = this.object.getCoords()
    const currRad = this.object.getRadians()
    return this.getClassInstancesAtCoords(
      [
        currCoords,
        {
          x: currCoords.x + this.viewDistance * Math.cos(currRad),
          y: currCoords.y + this.viewDistance * Math.sin(currRad),
        },
        {
          x: currCoords.x + this.viewDistance * Math.cos(currRad + this.fov),
          y: currCoords.y + this.viewDistance * Math.sin(currRad + this.fov),
        },
        {
          x: currCoords.x + this.viewDistance * Math.cos(currRad - this.fov),
          y: currCoords.y + this.viewDistance * Math.sin(currRad - this.fov),
        },
      ],
      classType,
    )
  }
}
