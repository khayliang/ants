import Pheromone from './Pheromone'
import PheromoneNavigationGraphic from './PheromoneNavigationGraphic'

export default class PheromoneNavigation extends Pheromone {
  constructor(coords) {
    super({coords, graphics: new PheromoneNavigationGraphic()})
  }
}
