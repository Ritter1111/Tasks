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
<zoidberg id="cancer">
</zoidberg>
<robot></robot>
    `,
  },
  {
    id: '5',
    title: 'General Sibling Selector',
    subtitle: 'Select elements that follows another',
    description: `You can select all siblings of an element that follow it.
     This is like the Adjacent Selector (A + B) except it gets all of the following
     elements instead of one`,
    selectors: ['amy~dog'],
    nameSelectors: 'A ~ B',
    examples: [
      `<tag>A ~ B</tag> select all <tag>B</tag> that follow a <tag>A</tag>`,
    ],
    code: `<amy>
  <hat></hat>
</amy>
<dog class="small"></dog>
<dog></dog>
<benderDrink>
  <beer></beer>
</benderDrink>
    `,
  },
  {
    id: '6',
    title: 'Universal Selector',
    subtitle: 'Combine the Universal Selector',
    description: `This selects all elements inside of <tag>A</tag>`,
    selectors: ['amy *'],
    nameSelectors: 'A *',
    examples: [`<tag>p*</tag> select every element inside <tag>p</tag>`],
    code: `<amy>
  <hat></hat>
</amy>
<benderDrink>
  <beer></beer>
</benderDrink>
<amy>
  <hat2></hat2>
</amy>
<amy>
  <hat3></hat3>
</amy>
    `,
  },
  {
    id: '7',
    title: 'Class Selector',
    subtitle: 'Select elements by their type',
    description: `The class selector selects all elements with that class attribute. 
    Elements can only have one ID, but many classes.`,
    selectors: ['.small', 'hat.small'],
    nameSelectors: '.className',
    examples: [
      `<tag>.bag</tag> select all elements
     with <tag>class='bag'</tag>`,
    ],
    code: `<amy>
  <hat></hat>
</amy>
<fry>
  <hat class="small"></hat>
</fry>
<professor>
  <richard></richard>
</professor>
<hat class="small"></hat>
    `,
  },
  {
    id: '8',
    title: 'Class Selector',
    subtitle: 'Select elements by their type',
    description: `The class selector selects all elements with that class attribute. 
    Elements can only have one ID, but many classes.`,
    selectors: ['.small', 'hat.small'],
    nameSelectors: '.className',
    examples: [
      `<tag>.bag</tag> select all elements
     with <tag>class='bag'</tag>`,
    ],
    code: `<amy>
  <hat></hat>
</amy>
<fry>
  <hat class="small"></hat>
</fry>
    `,
  },
]
