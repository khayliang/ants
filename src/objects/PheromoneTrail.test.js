import PheremoneGraphic from './PheremoneGraphic'
import Pheromone from './Pheromone'
import PheromoneTrail from './PheromoneTrail'

test('Pheromone can be added to pheromone trail', () => {
  const trail = new PheromoneTrail()
  const pheromone = new Pheromone()
  trail.add(pheromone)

  const arr = trail.getPheromones()
  expect(arr.length).toEqual(1)
  expect(arr[0]).toBe(pheromone)
})

test('Pheromone trail are displayed on the map at coord', () => {
  const addChildMock = jest.fn()
  const trail = new PheromoneTrail(addChildMock)
  const coords = { x: 5, y: 5 }
  const pheromone = new Pheromone()
  pheromone.setCoords(coords)
  trail.add(pheromone)
  expect(addChildMock.mock.calls.length).toBe(1)
  const addedGraphic = addChildMock.mock.calls[0][0]
  expect(addedGraphic).toBeInstanceOf(PheremoneGraphic)
  expect(addedGraphic.x).toEqual(coords.x)
  expect(addedGraphic.y).toEqual(coords.y)
})

test('When pheromone trail updates, pheremones are updated too', () => {
  const trail = new PheromoneTrail()
  const coords = { x: 5, y: 5 }
  const pheromone = new Pheromone()
  pheromone.setCoords(coords)
  const pheromoneUpdateMock = jest.fn()
  pheromone.update = pheromoneUpdateMock
  trail.add(pheromone)
  const updates = 5
  for (let i = 0; i !== updates; i += 1) {
    trail.update()
  }
  expect(pheromoneUpdateMock.mock.calls.length).toBe(updates)
})

test('When pheromone in trail expires, pheremone is unmounted from app', () => {
  const removeChildMock = jest.fn()
  const trail = new PheromoneTrail(() => {}, removeChildMock)

  const coords = { x: 5, y: 5 }
  const lifetime = 5
  const pheromone = new Pheromone()
  pheromone.setCoords(coords)
  pheromone.setLifetime(lifetime)
  trail.add(pheromone)

  for (let i = 0; i !== lifetime + 1; i += 1) {
    trail.update()
  }
  expect(removeChildMock.mock.calls.length).toBe(1)
  expect(trail.getPheromones().length).toBe(0)
})
