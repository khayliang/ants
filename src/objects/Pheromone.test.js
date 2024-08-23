import PheremoneGraphic from './PheremoneGraphic'
import Pheromone from './Pheromone'

test('Pheromone must have PheromoneGraphic property to render on pixijs', () => {
  const pheromone = new Pheromone()
  expect(pheromone.getGraphic()).toBeInstanceOf(PheremoneGraphic)
})

test('Pheromone can be initialized with coords', () => {
  const coords = { x: 5, y: 5 }
  const pheromone = new Pheromone({ coords })
  expect(pheromone.getCoords()).toMatchObject(coords)
})

test('Pheromone can expire after a number of updates', () => {
  const lifetime = 5
  const pheromone = new Pheromone({ lifetime })
  for (let i = 0; i !== lifetime - 1; i += 1) {
    expect(pheromone.update().isExpired()).toEqual(false)
  }
  expect(pheromone.update().isExpired()).toEqual(true)
})

test('Pheromone strength expires over time', () => {
  const lifetime = 5
  const pheromone = new Pheromone({ lifetime })
  pheromone.setLifetime(lifetime)
  pheromone.update() // age: 1
  pheromone.update() // age: 2

  expect(pheromone.getStrength()).toEqual(3 / 5)
})

test('Pheromone can have max strength that decreases over time', () => {
  const lifetime = 5
  const maxStrength = 0.5
  const pheromone = new Pheromone({ lifetime, maxStrength })
  pheromone.update() // age: 1
  pheromone.update() // age: 2

  expect(pheromone.getStrength()).toEqual(3 / 10)
})
