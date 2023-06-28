export interface ILevel {
  readonly id: string
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly selectors: string[]
  readonly nameSelectors: string
  readonly examples: string[]
  readonly code: CodeItem[]
}

export type CodeItem = {
  tag: string
  class?: string | null
  child: CodeItem | null
}
