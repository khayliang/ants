import getCoordsWithinMap from './utils/getCoordsWithinMap'

class Map {
  constructor(app) {
    this.app = app
    this.objects = []
  }

  addObject(obj) {
    this.objects.push(obj)
    if (obj.getGraphic) this.app.stage.addChild(obj.getGraphic())
  }

  start() {
    this.objects.forEach((obj) => {
      if (obj.update) this.app.ticker.add(() => obj.update())
    })
  }
}

export default Map
