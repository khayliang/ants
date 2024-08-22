import flipRadians from './flipRadians'

test('Flip radians', () => {
  expect(flipRadians(2)).toEqual(2 - Math.PI)
})
