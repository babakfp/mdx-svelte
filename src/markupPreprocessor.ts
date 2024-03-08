import type { MarkupPreprocessor } from "svelte/compiler"

import type { Config } from "./types.js"

const isFileIgnored = (
    filename: Parameters<MarkupPreprocessor>[0]["filename"],
    extensions: Config["extensions"]
) => {
    if (!filename) {
        return true
    }

    if (filename.includes("/.svelte-kit/")) {
        return true
    }

    for (const extension of extensions) {
        if (!filename.endsWith(extension)) {
            return true
        }
    }

    return false
}

export const markupPreprocessor = (extensions: Config["extensions"]) => {
    return ((options) => {
        if (isFileIgnored(options.filename, extensions)) return
        // ...
    }) satisfies MarkupPreprocessor
}
