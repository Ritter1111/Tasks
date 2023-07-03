import Level from '../src/scripts/level'

const level = new Level({
  id: '1',
  title: 'Type Selector',
  subtitle: 'Select elements by their type',
  description: `Desription`,
  selectors: ['robot', '*', 'robot, robot'],
  nameSelectors: 'A',
  examples: [`<tag>div</tag> selects`],
  code: [
    { tag: 'robot', class: null },
    { tag: 'robot', class: null },
  ],
})

test('returns true if entered selector is in selectors array', () => {
  expect(level.checkAnswer('robot')).toBe(true)
  expect(level.checkAnswer('*')).toBe(true)
  expect(level.checkAnswer('robot:last-child')).toBe(false)
})
