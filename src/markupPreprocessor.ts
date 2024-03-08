import type { MarkupPreprocessor } from "svelte/compiler"

import type { Config } from "./types.js"

export const markupPreprocessor = (extension: Config["extension"]) => {
    return ((options) => {
        if (!options.filename) return
        if (options.filename.includes("/.svelte-kit/")) return
        if (!options.filename.endsWith(extension)) return
        // ...
    }) satisfies MarkupPreprocessor
}
