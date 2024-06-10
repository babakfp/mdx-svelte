import type { ConfigOutput, MarkupPreprocessorOptions } from "./types/index.js"

// This is used to prevent some files from being preprocessed.
export const isFileIgnored = (
    filename: MarkupPreprocessorOptions["filename"],
    config: ConfigOutput,
) => {
    // NOTE: I don't know why this variable can be nullable, but that is what TypeScript says.
    if (!filename) {
        return true
    }

    if (filename.includes("/.svelte-kit/")) {
        return true
    }

    if (config.nodeModules.ignore && filename.includes("/node_modules/")) {
        let isAllowed = false

        for (const item of config.nodeModules.allowedDependencies) {
            if (filename.includes(`/node_modules/${item}/`)) {
                isAllowed = true
            }
        }

        if (!isAllowed) {
            return true
        }
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
