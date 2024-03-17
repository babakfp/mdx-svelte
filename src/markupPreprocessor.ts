import type { MarkupPreprocessor } from "svelte/compiler"

import type { ConfigOutput, ConfigCallbacks } from "./types.js"
import { isFileIgnored } from "./isFileIgnored.js"
import { transformer } from "./transformer.js"

export const markupPreprocessor = (
    config: ConfigOutput,
    callbacks: ConfigCallbacks | undefined
) => {
    return (async (options) => {
        if (isFileIgnored(options.filename, config)) return

        // NOTE: TypeScript sucks. I have verified that `filename` is not `undefined`, but TypeScript doesn't understand it.
        const typesafeOptions = options as { content: string; filename: string }

        if (callbacks?.onFileIgnore?.(typesafeOptions)) return

        const code = (await transformer(options.content, config)).toString()

        return { code }
        // ...
    }) satisfies MarkupPreprocessor
}
