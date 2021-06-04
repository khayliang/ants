import { Application } from 'pixi.js'
import Map from './Map'
import { initializeObjects } from './objects'
import './index.css'

const config = {
  ants: 10,
}

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
})
app.stage.sortableChildren = true

const objects = initializeObjects(config)

const map = new Map(app)

objects.forEach((obj) => map.addObject(obj))

map.start()

document.body.appendChild(app.view)
