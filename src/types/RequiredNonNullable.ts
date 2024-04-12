import type { Prettify } from "./Prettify.js"

/**
 * Same as `Required`, it also makes the properties non-optional.
 * {@link https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype TypeScript `NonNullable` type}.
 */
export type RequiredNonNullable<T> = Prettify<{
    [K in keyof T]-?: NonNullable<T[K]>
}>
