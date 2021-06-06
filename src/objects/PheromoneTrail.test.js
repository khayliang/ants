/* eslint-disable global-require */

import Pheromone from './Pheromone'

jest.mock('./Pheromone')

test('Pheromone can be added to pheromone trail', () => {
  const PheromoneTrail = require('./PheromoneTrail').default

  const trail = new PheromoneTrail()
  const coord = { x: 0, y: 0 }
  trail.add(coord)

  const arr = trail.getPheromones()
  expect(arr.length).toEqual(1)
  expect(arr[0]).toBeInstanceOf(Pheromone)
})

test('Pheromone are displayed on the map at coord', () => {
  const PheromoneTrail = require('./PheromoneTrail').default

  const addObjectMock = jest.fn()
  const trail = new PheromoneTrail({
    addObject: addObjectMock,
  })
  const coords = { x: 5, y: 5 }
  trail.add(coords)
  expect(Pheromone).toBeCalledWith(coords)
})

test('When pheromone trail updates, pheremones are updated too', () => {
  const PheromoneTrail = require('./PheromoneTrail').default

  const trail = new PheromoneTrail()
  const coords = { x: 5, y: 5 }
  trail.add(coords)
  const updates = 5
  for (let i = 0; i !== updates; i += 1) {
    trail.update()
  }
  const pheromoneUpdateMock = Pheromone.mock.instances[0].update
  expect(pheromoneUpdateMock).toHaveBeenCalledTimes(updates)
})

test('When pheromone in trail expires, pheremone is unmounted from app', () => {
  jest.unmock('./Pheromone')
  jest.resetModules()
  const PheromoneTrail = require('./PheromoneTrail').default

  const lifetime = 5

  const removeObjectMock = jest.fn()

  const trail = new PheromoneTrail({
    removeObject: removeObjectMock,
    lifetime,
  })

  const coords = { x: 5, y: 5 }
  trail.add(coords)

  for (let i = 0; i !== lifetime + 1; i += 1) {
    trail.update()
  }
  expect(removeObjectMock).toHaveBeenCalled()
  expect(trail.getPheromones().length).toBe(0)
})
