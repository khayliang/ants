class Map {
  constructor(app, objects) {
    this.app = app
    this.objects = objects
  }

  start() {
    if (!Array.isArray(this.objects)) throw Error('No object array')
    this.objects.forEach((obj) => {
      this.app.ticker.add(() => obj.update())
    })
  }
}

export default Map
