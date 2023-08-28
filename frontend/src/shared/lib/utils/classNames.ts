const isObject = (value: unknown): boolean => typeof value === 'object' && !Array.isArray(value) && value !== null

type Modificator = Record<string, unknown>
type Classes = string | Modificator | undefined

const filterModificator = (modificators: Modificator) =>
  Object.entries(modificators)
    .filter((modificator) => modificator[1])
    .map(([cls]) => cls)

export const cn = (...classes: Classes[]): string =>
  classes
    .map((cls) => (isObject(cls) ? filterModificator(cls as Modificator) : cls))
    .flat()
    .filter(Boolean)
    .join(' ')
