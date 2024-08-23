import Pheromone from './Pheromone'
import PheromoneFoodGraphic from './PheromoneFoodGraphic'

export default class PheromoneFood extends Pheromone {
  constructor(coords) {
    super({coords, graphics: new PheromoneFoodGraphic()})
  }
}
