import Game from '../src/scripts/game'
import Level from '../src/scripts/level'

jest.mock('../src/index.ts', () => {
  console.log('mock')
})

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  it('should initialize the game', () => {
    expect(game.levels).toHaveLength(11)
  })

  it('should get the current level', () => {
    const currentLevel = game.getCurrentLevel()
    expect(currentLevel).toBeDefined()
    expect(currentLevel.id).toBe('1')
  })

  it('should move to the next level', () => {
    game.trimAnswer = jest.fn().mockImplementation(() => '')
    jest.spyOn(game, 'renderLevel').mockImplementation(() => null)
    jest.spyOn(game, 'increaseProgressWidth').mockImplementation(() => null)

    const firstLevel = game.getCurrentLevel()
    expect(firstLevel).toBeDefined()
    expect(firstLevel.id).toBe('1')

    game.moveToNextLevel()

    const currentLevel = game.getCurrentLevel()

    expect(currentLevel).toBeDefined()
    expect(currentLevel.id).toBe('2')
  })

  it('should move to the previous level', () => {
    game.trimAnswer = jest.fn().mockImplementation(() => '')
    jest.spyOn(game, 'renderLevel').mockImplementation(() => null)
    jest.spyOn(game, 'increaseProgressWidth').mockImplementation(() => null)
    jest.spyOn(game, 'reduceProgressWidth').mockImplementation(() => null)

    game.moveToNextLevel()
    game.moveToPreviousLevel()

    const currentLevel = game.getCurrentLevel()

    expect(currentLevel).toBeDefined()
    expect(currentLevel.id).toBe('1')
  })

  it('should return next level', () => {
    const nextLevel = game.getNextLevel()
    expect(nextLevel).toBeDefined()
    expect(nextLevel?.id).toBe('2')
  })

  it('should return previous level', () => {
    game.trimAnswer = jest.fn().mockImplementation(() => '')
    jest.spyOn(game, 'renderLevel').mockImplementation(() => null)
    jest.spyOn(game, 'increaseProgressWidth').mockImplementation(() => null)
    jest.spyOn(game, 'reduceProgressWidth').mockImplementation(() => null)

    let previousLevel = game.getPreviousLevel()
    expect(previousLevel).not.toBeDefined()

    game.moveToNextLevel()

    previousLevel = game.getPreviousLevel()

    expect(previousLevel).toBeDefined()
    expect(previousLevel?.id).toBe('1')
  })

  it('should handle and trailing spaces', () => {
    const element = document.createElement('input')
    element.value = '   robot   ~    professor'

    const resultAnswer = game.trimAnswer(element)
    expect(resultAnswer).toBe('robot ~ professor')
  })

  it('should return level`s progress width', () => {
    game.levels = [
      new Level({
        id: '1',
        title: 'Type Selector',
        subtitle: 'Select elements ',
        description: `Desription`,
        selectors: ['robot'],
        nameSelectors: 'A',
        examples: [],
        code: [],
      }),
      new Level({
        id: '2',
        title: 'Type Selector',
        subtitle: 'Select elements by their type',
        description: `Desription`,
        selectors: [],
        nameSelectors: 'A B',
        examples: [],
        code: [],
      }),
      new Level({
        id: '3',
        title: 'Type Selector',
        subtitle: 'Select elements by their type',
        description: `Desription`,
        selectors: [],
        nameSelectors: 'A',
        examples: [],
        code: [],
      }),
    ]

    game.indexLevel = 1

    const progressWidth = game.getProgressWidth()
    expect(progressWidth).toBeCloseTo(69.6667, 4)
  })

  it('should set current index level', () => {
    const indexLevel = 6
    game.setCurrentLevelIndex(indexLevel)

    expect(game.indexLevel).toBe(indexLevel)
  })
})
