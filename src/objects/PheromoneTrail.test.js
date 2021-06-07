/* eslint-disable global-require */

import Pheromone from './Pheromone'

test('Pheromone can be initialized without arguments', () => {
  const PheromoneTrail = require('./PheromoneTrail').default
  expect(() => {
    new PheromoneTrail()
  }).not.toThrow()
})

test('Pheromone can be added to pheromone trail', () => {
  const PheromoneTrail = require('./PheromoneTrail').default

  const trail = new PheromoneTrail({ lifetime: 1 })
  const pheromone = new Pheromone({ x: 0, y: 0 })
  trail.add(pheromone)

  const arr = trail.getPheromones()
  expect(arr.length).toEqual(1)
  expect(arr[0]).toBeInstanceOf(Pheromone)
})

test('When pheromone trail updates, pheremones are updated too', () => {
  const PheromoneTrail = require('./PheromoneTrail').default

  const trail = new PheromoneTrail({ lifetime: 10 })
  const pheromone = new Pheromone({ x: 0, y: 0 })
  const pheromoneUpdateSpy = jest.spyOn(pheromone, 'update')
  trail.add(pheromone)
  const updates = 5
  for (let i = 0; i !== updates; i += 1) {
    trail.update()
  }
  expect(pheromoneUpdateSpy).toHaveBeenCalledTimes(updates)
})

test('Pheromone trail doesnt exist if lifetime = 0', () => {
  const PheromoneTrail = require('./PheromoneTrail').default

  const lifetime = 0

  const removePheromoneFromMapMock = jest.fn()

  const trail = new PheromoneTrail({
    removePheromoneFromMap: removePheromoneFromMapMock,
    lifetime,
  })
  trail.add(new Pheromone({ x: 0, y: 0 }))
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

  trail.add(new Pheromone({ x: 0, y: 0 }))

  for (let i = 0; i !== lifetime + 1; i += 1) {
    trail.update()
  }
  expect(removePheromoneFromMapMock).toHaveBeenCalled()
  expect(trail.getPheromones().length).toBe(0)
})
