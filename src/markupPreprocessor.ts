import type { MarkupPreprocessor } from "svelte/compiler"

import type { Config } from "./types.js"
import { isFileIgnored } from "./isFileIgnored.js"

export const markupPreprocessor = (config: Config) => {
    return ((options) => {
        if (isFileIgnored(options.filename, config)) return
        // ...
    }) satisfies MarkupPreprocessor
}
