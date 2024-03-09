import type { MarkupPreprocessor } from "svelte/compiler"

import type { ConfigOutput } from "./types.js"
import { isFileIgnored } from "./isFileIgnored.js"

export const markupPreprocessor = (config: ConfigOutput) => {
    return ((options) => {
        if (isFileIgnored(options.filename, config)) return
        // ...
    }) satisfies MarkupPreprocessor
}
