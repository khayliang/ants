import Ant from './Ant'
import AntGraphic from './AntGraphic'

test('Ant must have AntGraphic property to render on pixijs', () => {
  const ant = new Ant()
  expect(ant.getGraphic()).toBeInstanceOf(AntGraphic)
})

test('When ant update ant must move', () => {
  const ant = new Ant()
  expect(ant.getCoords()).not.toMatchObject(ant.update().getCoords())
  expect(ant.getCoords()).not.toMatchObject(ant.update().getCoords())
  expect(ant.getCoords()).not.toMatchObject(ant.update().getCoords())
})

test('Ant can move in different radians', () => {
  const ant = new Ant({
    initialRadians: 2,
  })
  const ant1 = new Ant({
    initialRadians: 1,
  })
  expect(ant.update().getCoords()).not.toMatchObject(ant1.update().getCoords())
  expect(ant.update().getCoords()).not.toMatchObject(ant1.update().getCoords())
  expect(ant.update().getCoords()).not.toMatchObject(ant1.update().getCoords())
})

test('Ant movement can be random', () => {
  const ant = new Ant({
    getRandomValue: () => Math.random(),
  })
  const ant1 = new Ant({
    getRandomValue: () => Math.random(),
  })
  expect(ant.update().getCoords()).not.toMatchObject(ant1.update().getCoords())
  expect(ant.update().getRadians()).not.toEqual(ant1.update().getRadians())
  expect(ant.update().getCoords()).not.toMatchObject(ant1.update().getCoords())
  expect(ant.update().getRadians()).not.toEqual(ant1.update().getRadians())
  expect(ant.update().getCoords()).not.toMatchObject(ant1.update().getCoords())
  expect(ant.update().getRadians()).not.toEqual(ant1.update().getRadians())
})

test('Ant can lay down a pheromone trail', () => {
  const addFn = jest.fn()
  const ant = new Ant({
    defaultTrail: {
      add: addFn,
    },
  })

  const trailAmt = 10
  for (let i = 0; i !== trailAmt; i += 1) {
    ant.sprayPheromone()
  }
  expect(addFn).toHaveBeenCalledTimes(trailAmt)
})

test('Ant updates pheromone trail', () => {
  const addFn = jest.fn()
  const updateFn = jest.fn()
  const ant = new Ant({
    defaultTrail: {
      add: addFn,
      update: updateFn,
    },
  })
  expect(updateFn).not.toHaveBeenCalled()
  ant.update()
  expect(updateFn).toHaveBeenCalled()
})

test('Ant sprays a pheromone every interval', () => {
  const interval = 5
  const ant = new Ant({ interval })

  const sprayPheromoneSpy = jest.spyOn(ant, 'sprayPheromone')

  const expectedSprayedAmt = 5
  const updateAmt = interval * expectedSprayedAmt
  for (let i = 0; i !== updateAmt; i += 1) {
    ant.update()
  }
  expect(sprayPheromoneSpy).toHaveBeenCalledTimes(expectedSprayedAmt)
})
