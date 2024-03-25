/*
TODO: I would like to add `ConfigOutput["extensions"]` as type to this variable but doing so throws an error.
https://github.com/fabian-hiller/valibot/discussions/476
*/
export const DEFAULT_EXTENSIONS: string[] = [".svelte.md"]

/** Default values used in `"stringify-entities"` package. */
export const HTML_DANGEROUS_CHARACTERS = ['"', "&", "'", "<", ">", "`"] as const

/** Svelte syntax characters. */
export const SVELTE_DANGEROUS_CHARACTERS = ["{", "}"] as const
