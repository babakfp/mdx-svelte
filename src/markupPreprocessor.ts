import type { MarkupPreprocessor } from "svelte/compiler"

import type { Config } from "./types.js"

export const markupPreprocessor = (extensions: Config["extensions"]) => {
    return ((options) => {
        if (!options.filename) return
        if (options.filename.includes("/.svelte-kit/")) return
        for (const extension of extensions) {
            if (!options.filename.endsWith(extension)) return
        }
        // ...
    }) satisfies MarkupPreprocessor
}
