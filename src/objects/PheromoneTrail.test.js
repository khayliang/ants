/* eslint-disable global-require */

import Pheromone from './Pheromone'

jest.mock('./Pheromone')

test('Pheromone can be added to pheromone trail', () => {
  const PheromoneTrail = require('./PheromoneTrail').default

  const trail = new PheromoneTrail({ lifetime: 1 })
  const coord = { x: 0, y: 0 }
  trail.add(coord)

  const arr = trail.getPheromones()
  expect(arr.length).toEqual(1)
  expect(arr[0]).toBeInstanceOf(Pheromone)
})

test('Pheromone are displayed on the map at coord', () => {
  const PheromoneTrail = require('./PheromoneTrail').default

  const addPheromoneToMapMock = jest.fn()
  const trail = new PheromoneTrail({
    addPheromoneToMap: addPheromoneToMapMock,
    lifetime: 1,
  })
  const coords = { x: 5, y: 5 }
  trail.add(coords)
  expect(Pheromone).toBeCalledWith(coords)
})

test('When pheromone trail updates, pheremones are updated too', () => {
  const PheromoneTrail = require('./PheromoneTrail').default

  const trail = new PheromoneTrail({ lifetime: 1 })
  const coords = { x: 5, y: 5 }
  trail.add(coords)
  const updates = 5
  for (let i = 0; i !== updates; i += 1) {
    trail.update()
  }
  const pheromoneUpdateMock = Pheromone.mock.instances[0].update
  expect(pheromoneUpdateMock).toHaveBeenCalledTimes(updates)
})

test('Pheromone trail doesnt exist if lifetime = 0', () => {
  const PheromoneTrail = require('./PheromoneTrail').default

  const lifetime = 0

  const removePheromoneFromMapMock = jest.fn()

  const trail = new PheromoneTrail({
    removePheromoneFromMap: removePheromoneFromMapMock,
    lifetime,
  })
  const coords = { x: 5, y: 5 }
  trail.add(coords)
  expect(trail.getPheromones().length).toBe(0)
})

test('When pheromone in trail expires, pheremone is unmounted from app', () => {
  jest.unmock('./Pheromone')
  jest.resetModules()
  const PheromoneTrail = require('./PheromoneTrail').default

  const lifetime = 5

  const removePheromoneFromMapMock = jest.fn()

  const trail = new PheromoneTrail({
    removePheromoneFromMap: removePheromoneFromMapMock,
    lifetime,
  })

  const coords = { x: 5, y: 5 }
  trail.add(coords)

  for (let i = 0; i !== lifetime + 1; i += 1) {
    trail.update()
  }
  expect(removePheromoneFromMapMock).toHaveBeenCalled()
  expect(trail.getPheromones().length).toBe(0)
})
