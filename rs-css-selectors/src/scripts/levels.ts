export const levels = [
  {
    id: '1',
    title: 'Type Selector',
    subtitle: 'Select elements by their type',
    description: `Selects all elements of type A. Type refers to the type of tag,
      so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all
      different element types.`,
    selectors: ['amy'],
    nameSelectors: 'A',
    examples: [`<tag>div</tag> selects all <tag>div</tag> elements.`],
    code: `
    <amy></amy>
    <amy></amy>
    <fry></fry>
    `,
  },
  {
    id: '2',
    title: 'Type Selector',
    subtitle: 'Select elements by their type',
    description:
      'Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.',
    selectors: ['fry'],
    nameSelectors: 'A',
    examples: ['hsdjjhxcxhcjxgfjcxhgjfhcjfhcxjfcfxhfj'],
    code: `
    <amy></amy>
    <fry></fry>
    <fry></fry>
    `,
  },
]
