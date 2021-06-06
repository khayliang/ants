import { Application } from 'pixi.js'

import Ant from './objects/Ant'

import './index.css'
import Nest from './objects/Nest'
import PartitionGrid from './partition/PartitionGrid'
import Food from './objects/Food'

const ants = 1

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
})
app.stage.sortableChildren = true
app.ticker.maxFPS = 60

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
app.stage.addChild(nest.getGraphic())

const addInteractableObject = (obj) => {
  app.stage.addChild(obj.getGraphic())
  grid.addObject(obj)
}
const removeInteractableObject = (obj) => {
  app.stage.removeChild(obj.getGraphic())
  grid.removeObject(obj)
}

for (let i = 0; i !== ants; i += 1) {
  const ant = new Ant({
    addPheromone: addInteractableObject,
    removePheromone: removeInteractableObject,
    getRandomValue: () => (Math.random() - 0.5) * 0.5,
    getObjectsAtCoords: (coords) => grid.getObjectsInMultipleCoords(coords),
    radians: Math.random() * Math.PI * 2,
    speed: 1,
    interval: 2,
    trailLength: 0,
    viewDistance: 30,
    fov: Math.PI / 6,
  })
  nest.addAnt(ant)
  app.stage.addChild(ant.getGraphic())
  app.ticker.add(() => ant.update())
}

const foods = 100
for (let i = 0; i !== foods; i += 1) {
  const food = new Food()
  food.setCoords({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  })
  addInteractableObject(food)
}

document.body.appendChild(app.view)
