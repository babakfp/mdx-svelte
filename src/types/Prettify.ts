/**
 * Unwraps named object types for improved readability.
 * {@link https://www.totaltypescript.com/concepts/the-prettify-helper The `Prettify` Helper}.
 */
export type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}
