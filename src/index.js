import { Application } from 'pixi.js'

import Map from './Map'
import Ant from './objects/Ant'

import './index.css'
import Nest from './objects/Nest'

const ants = 10

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
})
app.stage.sortableChildren = true
const map = new Map(app)

const nest = new Nest()
nest.setCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
map.addObject(nest)

for (let i = 0; i !== ants; i += 1) {
  const ant = new Ant()
  ant.setRadians(Math.random() * Math.PI * 2)
  ant.setRandomizer(() => Math.random() - 0.5)
  nest.addAnt(ant)

  map.addObject(ant)
}

map.start()

document.body.appendChild(app.view)
