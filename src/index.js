import { Application } from 'pixi.js'

import Map from './Map'
import Ant from './objects/Ant'

import './index.css'
import Nest from './objects/Nest'
import PartitionGrid from './partition/PartitionGrid'

const ants = 10

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
})
app.stage.sortableChildren = true
app.ticker.maxFPS = 60
const map = new Map(app)
const grid = new PartitionGrid({
  width: window.innerWidth,
  height: window.innerHeight,
  tileSize: 100,
})
grid.getTiles().forEach((tile) => {
  app.stage.addChild(tile.getGraphic())
})

// add grid update first because it should run before anything else
app.ticker.add(() => grid.update())

const nest = new Nest()
nest.setCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
map.addObject(nest)

const addPheromone = (pheromone) => {
  app.stage.addChild(pheromone.getGraphic())
  grid.addObject(pheromone)
}
const removePheromone = (pheromone) => {
  app.stage.removeChild(pheromone.getGraphic())
  grid.removeObject(pheromone)
}

for (let i = 0; i !== ants; i += 1) {
  const ant = new Ant({
    addPheromone,
    removePheromone,
    getRandomValue: () => (Math.random() - 0.5) * 0.5,
    getObjectsAtCoords: (coords) => grid.getObjectsInMultipleCoords(coords),
    radians: Math.random() * Math.PI * 2,
    speed: 15,
    interval: 2,
    trailLength: 50,
    viewDistance: 30,
    fov: Math.PI / 6,
  })

  nest.addAnt(ant)
  map.addObject(ant)
}

map.start()

document.body.appendChild(app.view)
