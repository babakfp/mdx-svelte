import type { MarkupPreprocessor } from "svelte/compiler"

import type {
    ConfigOutput,
    ConfigCallbacks,
    RequiredNonNullable,
} from "./types.js"
import { isFileIgnored } from "./isFileIgnored.js"
import { transformer } from "./transformer.js"

export const markupPreprocessor = (
    config: ConfigOutput,
    callbacks: ConfigCallbacks | undefined
) => {
    return (async (options) => {
        if (isFileIgnored(options.filename, config)) return

        // NOTE: I have verified that `filename` is not `undefined` but TypeScript doesn't understand it.
        const options_ = options as RequiredNonNullable<typeof options>

        if (callbacks?.onFileIgnore?.(options_)) return

        const code = (await transformer(config, options_)).toString()

        return { code }
        // ...
    }) satisfies MarkupPreprocessor
}
