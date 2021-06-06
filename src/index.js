import { Application } from 'pixi.js'

import Ant from './objects/Ant'

import './index.css'
import Nest from './objects/Nest'
import PartitionGrid from './partition/PartitionGrid'
import Food from './objects/Food'
import Eye from './objects/Eye'
import PheromoneTrail from './objects/PheromoneTrail'

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
  const length = 0
  const interval = 10
  const lifetime = interval * length

  const defaultTrail = new PheromoneTrail({
    onPheromoneAdd: addInteractableObject,
    onPheromoneExpire: removeInteractableObject,
    lifetime,
  })

  const ant = new Ant({
    getRandomValue: () => (Math.random() - 0.5) * 0.5,
    initialRadians: Math.random() * Math.PI * 2,
    defaultTrail,
    speed: 1,
    interval,
  })

  const eye = new Eye({
    object: ant,
    getObjectsAtCoords: (coords) => grid.getObjectsInMultipleCoords(coords),
    viewDistance: 30,
    fov: Math.PI / 6,
  })
  ant.setEye(eye)

  nest.addAnt(ant)
  app.stage.addChild(ant.getGraphic())
  app.ticker.add(() => ant.update())
}

const foods = 100
for (let i = 0; i !== foods; i += 1) {
  const food = new Food()
  food.setCoords({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  })
  addInteractableObject(food)
}

document.body.appendChild(app.view)
