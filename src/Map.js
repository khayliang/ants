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
      if (coords.x >= bounds.width) {
        obj.setCoords({ x: 0, y: bounds.height - coords.y })
      } else if (coords.x < 0) {
        obj.setCoords({ x: bounds.width - 1, y: bounds.height - coords.y })
      }

      if (coords.y >= bounds.height) {
        obj.setCoords({ x: bounds.width - coords.x, y: 0 })
      } else if (coords.y < 0) {
        obj.setCoords({ x: bounds.width - coords.x, y: bounds.height - 1 })
      }
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
