export const levels = [
  {
    id: '1',
    title: 'Type Selector',
    subtitle: 'Select elements by their type',
    description: `Selects all elements of type A. Type refers to the type of tag,
      so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all
      different element types.`,
    selectors: ['robot'],
    nameSelectors: 'A',
    examples: [`<tag>div</tag> selects all <tag>div</tag> elements.`],
    code: `<robot></robot>
<robot></robot>
    `,
  },
  {
    id: '2',
    title: 'Type Selector',
    subtitle: 'Select elements by their type',
    description: `Selects all elements of type A. Type refers to the type of tag,
    so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all
    different element types.`,
    selectors: ['fry'],
    nameSelectors: 'A',
    examples: [`<tag>div</tag> selects all <tag>div</tag> elements.`],
    code: `<fry></fry>
<amy></amy>
<fry></fry>
    `,
  },
  {
    id: '3',
    title: 'Descendant Selector',
    subtitle: 'Select all element inside another element',
    description: `Selects all <tag>B</tag> inside of <tag>A</tag>. <tag>B</tag> is
    called a descendant because it is inside of another element`,
    selectors: ['beer'],
    nameSelectors: 'A B',
    examples: [
      `<tag>h1 strong</tag> select all <tag>strong</tag> elements that are inside of any <tag>p</tag>`,
    ],
    code: `<benderDrink>
  <beer></beer>
</benderDrink>
<benderDrink>
  <beer></beer>
</benderDrink>
    `,
  },
  {
    id: '4',
    title: 'ID Selector',
    subtitle: 'Select elements with an ID',
    description: `Selects all elements with a specific <tag>id</tag>. You can also combine the ID selector with the type selector`,
    selectors: ['zoidberg'],
    nameSelectors: '#id',
    examples: [`<tag>#nice</tag> select any element with <tag>id="nice"</tag>`],
    code: `<robot></robot>
<zoidberg id="cancer"></zoidberg>
<robot></robot>
    `,
  },
]
