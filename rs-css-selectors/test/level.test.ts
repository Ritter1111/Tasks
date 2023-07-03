import Level from '../src/scripts/level'
import { levels } from '../src/scripts/levels'

test('returns true if entered selector is in selectors array', () => {
  const level = new Level(levels[0])
  expect(level.checkAnswer('robot')).toBe(true)
  expect(level.checkAnswer('*')).toBe(true)
  expect(level.checkAnswer('robot:last-child')).toBe(false)
})
