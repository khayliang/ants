/* eslint class-methods-use-this: ["error", { "exceptMethods": [
  "getObjectsAtCoords",
  "getClassInstancesAtCoords"
] }] */

export default class Eye {
  constructor({
    object,
    getNearbyObjects,
    getNearbyClassInstances,
    viewDistance = 10,
    fov = 0.52,
  }) {
    this.object = object
    this.viewDistance = viewDistance
    this.fov = fov

    this.getNearbyObjects = () => getNearbyObjects(this.object.getCoords())
    this.getNearbyClassInstances = (classType) =>
      getNearbyClassInstances(this.object.getCoords(), classType)
  }

  getNearbyObjects() {
    return []
  }

  getNearbyClassInstances() {
    return []
  }
}
