import { Application } from 'pixi.js'

import Map from './Map'
import Ant from './objects/Ant'

import './index.css'
import Nest from './objects/Nest'
import OccupancyGrid from './occupancy/OccupancyGrid'

const ants = 1

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
})
app.stage.sortableChildren = true
app.ticker.maxFPS = 60
const map = new Map(app)
const grid = new OccupancyGrid({
  width: window.innerWidth,
  height: window.innerHeight,
  tileSize: 80,
})
grid.getTiles().forEach((tile) => {
  app.stage.addChild(tile.getGraphic())
})

// add grid update first because it should run before anything else
app.ticker.add(() => grid.update())

const nest = new Nest()
nest.setCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
map.addObject(nest)

for (let i = 0; i !== ants; i += 1) {
  const ant = new Ant({
    addChild: (obj) => app.stage.addChild(obj),
    removeChild: (obj) => app.stage.removeChild(obj),
    getRandomValue: () => (Math.random() - 0.5) * 0.5,
    getObjectAtCoords: (coords) => grid.getObjectsInCoords(coords),
    radians: Math.random() * Math.PI * 2,
    speed: 1,
    interval: 20,
    trailLength: 10,
  })

  nest.addAnt(ant)
  map.addObject(ant)
}

map.start()

document.body.appendChild(app.view)
