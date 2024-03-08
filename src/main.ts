import type { MarkupPreprocessor, PreprocessorGroup } from "svelte/compiler"

const EXTENSION = ".svelte.md" as const

const markupPreprocessor: MarkupPreprocessor = (options) => {
    if (!options.filename) return
    if (options.filename.includes("/.svelte-kit/")) return
    if (!options.filename.endsWith(EXTENSION)) return
    // ...
}

export const svelteInMarkdown = () => {
    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor,
    } satisfies PreprocessorGroup
}
