import { Application } from 'pixi.js'

import Ant from './objects/Ant'

import './index.css'
import Nest from './objects/Nest'
import PartitionGrid from './partition/PartitionGrid'
import Food from './objects/Food'
import PheromoneTrail from './objects/PheromoneTrail'
import Eye from './objects/Eye'

const ants = 50

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
})
app.stage.sortableChildren = true
app.ticker.maxFPS = 60

const grid = new PartitionGrid({
  width: window.innerWidth,
  height: window.innerHeight,
  tileSize: 30,
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

addInteractableObject(nest)

for (let i = 0; i !== ants; i += 1) {
  const length = 40
  const interval = 7
  const lifetime = interval * length

  const trail = new PheromoneTrail({
    addPheromoneToMap: addInteractableObject,
    removePheromoneFromMap: removeInteractableObject,
    lifetime,
  })

  const ant = new Ant({
    getRandomValue: () => (Math.random() - 0.5) * 0.2,
    initialRadians: Math.random() * Math.PI * 2,
    trail,
    speed: 3,
    interval,
    reachDistance: 10,
    maxPheromones: lifetime
  })

  const eye = new Eye({
    object: ant,
    getNearbyObjects: (coords) => grid.getNearbyObjects(coords),
    getNearbyClassInstances: (coords, classType) => grid.getNearbyClassInstances(coords, classType),
    viewDistance: 50,
    fov: Math.PI / 2,
  })
  ant.setEye(eye)

  nest.addAnt(ant)
  app.stage.addChild(ant.getGraphic())
  app.ticker.add(() => ant.update())
}

const foods = 1000
const foodSourceCoords = { x: 450, y: 150 }
for (let i = 0; i !== foods; i += 1) {
  const food = new Food({
    onTake: () => removeInteractableObject(food),
  })
  food.setCoords({
    x: foodSourceCoords.x + Math.random() * 50 - 25,
    y: foodSourceCoords.y + Math.random() * 50 - 25,
  })
  addInteractableObject(food)
}

document.body.appendChild(app.view)
