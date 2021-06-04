import { initializeObjects } from './index'
import { Ant } from './Ant'

test('initializeObjects crashes if no config', () => {
  expect(() => {
    initializeObjects()
  }).toThrowError()
})

test('initializeObjects gives me an array of ants using config', () => {
  const antsAmount = 100
  const config = {
    ants: antsAmount,
  }
  const objs = initializeObjects(config)
  expect(objs.length).toEqual(antsAmount)
  objs.forEach((obj) => expect(obj).toBeInstanceOf(Ant))
})
