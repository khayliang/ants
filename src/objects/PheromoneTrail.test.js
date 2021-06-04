import PheromoneTrail from './PheromoneTrail'

test('Pheromone can be added to pheromone trail', () => {
  const trail = new PheromoneTrail()
  trail.add({ x: 5, y: 5 })

  const arr = trail.getPheromones()
  expect(arr.length).toEqual(1)
})
