import type { MarkupPreprocessor } from "svelte/compiler"

import type { ConfigOutput } from "./types.js"

// This is used to prevent some files from being preprocessed.
export const isFileIgnored = (
    filename: Parameters<MarkupPreprocessor>[0]["filename"],
    config: ConfigOutput
) => {
    // NOTE: I'm don't know why this variable can be nullable, but that is what TypeScript says.
    if (!filename) {
        return true
    }

    if (filename.includes("/.svelte-kit/")) {
        return true
    }

    for (const extension of config?.extensions ?? []) {
        if (!filename.endsWith(extension)) {
            return true
        }
    }

    return false
}
