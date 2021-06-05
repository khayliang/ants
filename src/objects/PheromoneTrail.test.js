import PheremoneGraphic from './PheremoneGraphic'
import PheromoneTrail from './PheromoneTrail'

test('Pheromone can be added to pheromone trail', () => {
  const trail = new PheromoneTrail()
  trail.add({ x: 5, y: 5 })

  const arr = trail.getPheromones()
  expect(arr.length).toEqual(1)
})

test('Pheromone trail are displayed on the map at coord', () => {
  const addChildMock = jest.fn()
  const trail = new PheromoneTrail(addChildMock)
  const coords = { x: 5, y: 5 }
  trail.add(coords)
  expect(addChildMock.mock.calls.length).toBe(1)
  const addedGraphic = addChildMock.mock.calls[0][0]
  expect(addedGraphic).toBeInstanceOf(PheremoneGraphic)
  expect(addedGraphic.x).toEqual(coords.x)
  expect(addedGraphic.y).toEqual(coords.y)
})
