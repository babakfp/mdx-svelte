export const DOT_SVELTE = ".svelte"
export const DOT_MD = ".md"
export const DOT_SVELTE_MD = `${DOT_SVELTE}${DOT_MD}`
export const SVELTE_CONFIG_EXTENSIONS = [
    DOT_SVELTE,
    DOT_MD,
    DOT_SVELTE_MD,
] as const
