/*
TODO: I would like to add `ConfigOutput["extensions"]` as type to this variable but doing so throws an error.
https://github.com/fabian-hiller/valibot/discussions/476
*/
export const DEFAULT_EXTENSIONS: string[] = [".svelte.md"]

export const STRINGIFY_ENTITIES_DEFAULT_DANGEROUS_CHARACTERS = [
    '"',
    "&",
    "'",
    "<",
    ">",
    "`",
] as const

export const STRINGIFY_ENTITIES_DEFAULT_SVELTE_DANGEROUS_CHARACTERS = [
    "{",
    "}",
] as const
