import getCoordsWithinMap from "./utils/getCoordsWithinMap"

class Map {
  constructor(app) {
    this.app = app
    this.objects = []
  }

  addObject(obj) {
    this.objects.push(obj)
    if (obj.getGraphic) this.app.stage.addChild(obj.getGraphic())
  }

  update() {
    const bounds = this.app.screen
    this.objects.forEach((obj) => {
      const coords = obj.getCoords()
      const newCoords = getCoordsWithinMap(coords, bounds)
      obj.setCoords(newCoords)
    })
  }

  start() {
    this.objects.forEach((obj) => {
      if (obj.update) this.app.ticker.add(() => obj.update())
    })
    this.app.ticker.add(() => this.update())
  }
}

export default Map
