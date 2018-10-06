declare interface Array<T> {
  equal(array: T[]): boolean
}

declare const crashApp: (message: string, error: Error) => void
