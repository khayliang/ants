import { Application } from 'pixi.js'
import Map from './map'
import { initializeObjects } from './objects'
import './index.css'

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
})
app.stage.sortableChildren = true

const objects = initializeObjects(app)

const map = new Map(app, objects)

map.start()

document.body.appendChild(app.view)
