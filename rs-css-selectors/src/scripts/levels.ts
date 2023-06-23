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
    code: `<robot></robot>
<robot></robot>
    `,
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
      `<tag>h1 strong</tag> select all <tag>strong</tag> elements that 
      are inside of any <tag>p</tag>`,
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
    description: `Selects all elements with a specific <tag>id</tag>. 
    You can also combine the ID selector with the type selector`,
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
    selectors: ['amy~dog', 'amy ~ dog'],
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
    examples: [
      `<tag>p*</tag> select every element inside <tag class="brackets">p</tag>`,
    ],
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
    subtitle: 'Combine the Class Selector',
    description: `You can combine the class selector with other selectors, 
    like the type selector`,
    selectors: ['hat3.small'],
    nameSelectors: 'A.className',
    examples: [
      `<tag>p.important</tag> select all <tag class="brackets">p</tag> elements
     that have <tag>class='important'</tag>`,
    ],
    code: `<amy>
  <hat3></hat3>
</amy>
<fry>
  <hat3 class="small"></hat3>
</fry>
<robot>
  <hat3 class="small"></hat3>
</robot>
<dog class="small"></dog>
    `,
  },
  {
    id: '9',
    title: 'Comma Combinator',
    subtitle: 'Combine, selectors, with... commas!',
    description: `Thanks to Shatner technology, this selects all <tag>A</tag> 
    and <tag>B</tag> elements. 
    You can combine any selectors this way, and you can specify more than two.`,
    selectors: ['hat3.small'],
    nameSelectors: 'A, B',
    examples: [
      `<tag>p, .fun</tag> selects all <tag class="brackets">p</tag> 
      elements as well as all elements with <tag>class="fun"</tag>`,
    ],
    code: `<amy>
  <hat3></hat3>
</amy>
<fry>
  <hat3 class="small"></hat3>
</fry>
<robot>
  <hat3 class="small"></hat3>
</robot>
<dog class="small"></dog>
    `,
  },
  {
    id: '10',
    title: 'Adjacent Sibling Selector',
    subtitle: 'Select an element that directly follows another element',
    description: `This selects all <tag>B</tag> elements that directly follow <tag>A</tag>. 
    Elements that follow one another are called siblings. They're on the same level, or depth.
    In the HTML markup for this level, elements that have the same indentation are siblings.`,
    selectors: ['hat3.small'],
    nameSelectors: 'A + B',
    examples: [
      `<tag>h1 + .like</tag> selects every element with <tag>class="like"</tag> 
      that directly follows a <tag class="brackets">p</tag>`,
    ],
    code: `<amy>
  <hat3></hat3>
</amy>
<fry>
  <hat3 class="small"></hat3>
</fry>
<robot>
  <hat3 class="small"></hat3>
</robot>
<dog class="small"></dog>
    `,
  },
]
