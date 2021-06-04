import { Application } from 'pixi.js'

import Map from './Map'
import Ant from "./objects/Ant"

import './index.css'
import Nest from './objects/Nest'

const ants = 10

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
})
app.stage.sortableChildren = true

const objects = []

for (let i = 0; i != ants; i += 1) {
  objects.push(new Ant())
}

const map = new Map(app)

objects.forEach((obj) => map.addObject(obj))

map.start()

document.body.appendChild(app.view)
