import type { MarkupPreprocessor } from "svelte/compiler"

import type { Config } from "./types.js"

export const isFileIgnored = (
    filename: Parameters<MarkupPreprocessor>[0]["filename"],
    config: Config
) => {
    if (!filename) {
        return true
    }

    if (filename.includes("/.svelte-kit/")) {
        return true
    }

    for (const extension of config.extensions) {
        if (!filename.endsWith(extension)) {
            return true
        }
    }

    return false
}
