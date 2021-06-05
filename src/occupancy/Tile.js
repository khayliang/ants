import GameObject from '../objects/GameObject'
import TileGraphic from './TileGraphic'

export default class extends GameObject {
  constructor(params) {
    super(new TileGraphic(params))
  }
}
