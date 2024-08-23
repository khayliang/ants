import Pheromone from './Pheromone'
import PheromoneFoodGraphic from './PheromoneFoodGraphic'

export default class PheromoneFood extends Pheromone {
  constructor({ coords, maxStrength } = {}) {
    super({ coords, maxStrength, graphics: new PheromoneFoodGraphic() })
  } 
}
