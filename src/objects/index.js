import { Ant } from './Ant'

export const initializeObjects = (config) => {
  const { ants } = config
  const objs = []

  for (let i = 0; i != ants; i += 1) {
    objs.push(new Ant())
  }

  return objs
}
