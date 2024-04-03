import type { ConfigOutput, MarkupPreprocessorOptions } from "./types.js"

// This is used to prevent some files from being preprocessed.
export const isFileIgnored = (
    filename: MarkupPreprocessorOptions["filename"],
    config: ConfigOutput
) => {
    // NOTE: I'm don't know why this variable can be nullable, but that is what TypeScript says.
    if (!filename) {
        return true
    }

    if (filename.includes("/.svelte-kit/")) {
        return true
    }

    let isContainsExtension = false
    for (const extension of config.extensions) {
        if (filename.endsWith(extension)) {
            isContainsExtension = true
            break
        }
    }
    if (!isContainsExtension) {
        return true
    }

    return false
}
