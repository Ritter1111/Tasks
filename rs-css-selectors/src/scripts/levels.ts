export const levels = [
  {
    id: '1',
    title: 'Type Selector',
    subtitle: 'Select elements by their type',
    description: `Selects all elements of type A. Type refers to the type of tag,
      so <tag class="brackets">div</tag>, <tag class="brackets">p</tag> 
      and <tag class="brackets">ul</tag> are all
      different element types.`,
    selectors: ['robot', '*'],
    nameSelectors: 'A',
    examples: [
      `<tag>div</tag> selects all <tag class="brackets">div</tag> elements.`,
    ],
    code: [
      {
        tag: 'robot',
        class: null,
      },
      {
        tag: 'robot',
        class: null,
      },
    ],
  },
  {
    id: '2',
    title: 'Type Selector',
    subtitle: 'Select elements by their type',
    description: `Selects all elements of type A. Type refers to the type of tag,
      so <tag class="brackets">div</tag>, <tag class="brackets">p</tag>
      and <tag class="brackets">ul</tag> are all
      different element types.`,
    selectors: ['fry'],
    nameSelectors: 'A',
    examples: [
      `<tag>div</tag> selects all <tag class="brackets">div</tag> elements.`,
    ],
    code: [
      {
        tag: 'fry',
        class: null,
      },
      {
        tag: 'amy',
        class: null,
      },
      {
        tag: 'frog',
        class: null,
      },
      {
        tag: 'fry',
        class: null,
      },
    ],
  },
  {
    id: '3',
    title: 'Descendant Selector',
    subtitle: 'Select all element inside another element',
    description: `Selects all <tag>B</tag> inside of <tag>A</tag>. <tag>B</tag> is
      called a descendant because it is inside of another element`,
    selectors: ['professor richard'],
    nameSelectors: 'A B',
    examples: [
      `<tag>h1 strong</tag> select all <tag>strong</tag> elements that
        are inside of any <tag>p</tag>`,
    ],
    code: [
      {
        tag: 'richard',
        class: null,
      },
      {
        tag: 'professor',
        class: null,
      },
      {
        tag: 'professor',
        class: null,
        child: {
          tag: 'richard',
        },
      },
      {
        tag: 'richard',
        class: null,
      },
    ],
  },
  {
    id: '4',
    title: 'ID Selector',
    subtitle: 'Select elements with an ID',
    description: `Selects all elements with a specific <tag>id</tag>.
      You can also combine the ID selector with the type selector`,
    selectors: ['#small', 'robot#small'],
    nameSelectors: '#id',
    examples: [`<tag>#nice</tag> select any element with <tag>id="nice"</tag>`],
    code: [
      {
        tag: 'robot',
        class: null,
      },
      {
        tag: 'robot',
        class: null,
        id: 'small',
      },
      {
        tag: 'bender',
        class: null,
      },
    ],
  },
  {
    id: '5',
    title: 'General Sibling Selector',
    subtitle: 'Select elements that follows another',
    description: `You can select all siblings of an element that follow it.
       This is like the Adjacent Selector (A + B) except it gets all of the following
       elements instead of one`,
    selectors: ['bender ~ freak'],
    nameSelectors: 'A ~ B',
    examples: [
      `<tag>A ~ B</tag> select all <tag>B</tag> that follow a <tag>A</tag>`,
    ],
    code: [
      {
        tag: 'freak',
        class: null,
      },
      {
        tag: 'freak',
        class: null,
        id: null,
      },
      {
        tag: 'bender',
        class: null,
      },
      {
        tag: 'freak',
        class: null,
      },
      {
        tag: 'freak',
        class: null,
      },
      {
        tag: 'dog',
        class: null,
      },
    ],
  },
  {
    id: '6',
    title: 'Universal Selector',
    subtitle: 'Combine the Universal Selector',
    description: `This selects all elements inside of <tag>A</tag>`,
    selectors: [
      'amy *',
      'amy hat, amy hat2, amy hat3',
      'amy hat, amy hat2, amy hat3.black',
    ],
    nameSelectors: 'A *',
    examples: [
      `<tag>p*</tag> select every element inside <tag class="brackets">p</tag>`,
    ],
    code: [
      {
        tag: 'amy',
        class: null,
        child: {
          tag: 'hat',
        },
      },
      {
        tag: 'benderDrink',
        class: null,
        child: {
          tag: 'beer',
        },
      },
      {
        tag: 'amy',
        class: null,
        child: {
          tag: 'hat2',
        },
      },
      {
        tag: 'amy',
        class: null,
        child: {
          tag: 'hat3',
          class: 'black',
        },
      },
    ],
  },
  {
    id: '7',
    title: 'Class Selector',
    subtitle: 'Select elements by their type',
    description: `The class selector selects all elements with that class attribute.
      Elements can only have one ID, but many classes.`,
    selectors: ['.small', 'hat.small', 'hat.small, fry.small'],
    nameSelectors: '.className',
    examples: [
      `<tag>.bag</tag> select all elements
       with <tag>class='bag'</tag>`,
    ],
    code: [
      {
        tag: 'fry',
        class: null,
      },
      {
        tag: 'fry',
        class: null,
        child: {
          tag: 'hat',
          class: 'small',
        },
      },
      {
        tag: 'hat',
        class: null,
      },
    ],
  },
  {
    id: '8',
    title: 'Class Selector',
    subtitle: 'Combine the Class Selector',
    description: `You can combine the class selector with other selectors,
      like the type selector`,
    selectors: ['hat3.small', 'fry hat3.small, robot hat3.small'],
    nameSelectors: 'A.className',
    examples: [
      `<tag>p.important</tag> select all <tag class="brackets">p</tag> elements
       that have <tag>class='important'</tag>`,
    ],
    code: [
      {
        tag: 'amy',
        class: null,
        child: {
          tag: 'hat3',
        },
      },
      {
        tag: 'fry',
        class: null,
        child: {
          tag: 'hat3',
          class: 'small',
        },
      },
      {
        tag: 'robot',
        class: null,
        child: {
          tag: 'hat3',
          class: 'small',
        },
      },
      {
        tag: 'dog',
        class: 'small',
      },
    ],
  },
  {
    id: '9',
    title: 'Comma Combinator',
    subtitle: 'Combine, selectors, with... commas!',
    description: `Thanks to Shatner technology, this selects all <tag>A</tag>
      and <tag>B</tag> elements.
      You can combine any selectors this way, and you can specify more than two.`,
    selectors: ['richard,hat2'],
    nameSelectors: 'A, B',
    examples: [
      `<tag>p, .fun</tag> selects all <tag class="brackets">p</tag>
        elements as well as all elements with <tag>class="fun"</tag>`,
    ],
    code: [
      {
        tag: 'professor',
        class: null,
        child: {
          tag: 'richard',
        },
      },
      {
        tag: 'richard',
        class: null,
      },
      {
        tag: 'amy',
        class: null,
        child: {
          tag: 'hat2',
        },
      },
      {
        tag: 'hat2',
      },
    ],
  },
  {
    id: '10',
    title: 'Adjacent Sibling Selector',
    subtitle: 'Select an element that directly follows another element',
    description: `This selects all <tag>B</tag> elements that directly follow <tag>A</tag>.
      Elements that follow one another are called siblings. They're on the same level, or depth.
      In the HTML markup for this level, elements that have the same indentation are siblings.`,
    selectors: ['frog + freak'],
    nameSelectors: 'A + B',
    examples: [
      `<tag>h1 + .like</tag> selects every element with <tag>class="like"</tag>
        that directly follows a <tag class="brackets">p</tag>`,
    ],
    code: [
      {
        tag: 'freak',
        class: null,
      },
      {
        tag: 'frog',
        class: null,
        id: null,
      },
      {
        tag: 'freak',
        class: null,
      },
      {
        tag: 'freak',
        class: null,
      },
      {
        tag: 'frog',
        class: null,
      },
      {
        tag: 'freak',
        class: null,
      },
      {
        tag: 'freak',
        class: null,
      },
      {
        tag: 'freak',
        class: null,
      },
    ],
  },
  {
    id: '11',
    title: 'Universal Selector',
    subtitle: 'Universal Selector',
    description: `This selector select all elements`,
    selectors: ['*', 'benderDrink, angel, robot, fry'],
    nameSelectors: '*',
    examples: [`<tag>*</tag> select every element on page`],
    code: [
      {
        tag: 'benderDrink',
        class: null,
      },
      {
        tag: 'angel',
        class: null,
      },
      {
        tag: 'robot',
        class: null,
      },
      {
        tag: 'fry',
        class: null,
      },
    ],
  },
]
