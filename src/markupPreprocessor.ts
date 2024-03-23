import type { MarkupPreprocessor } from "svelte/compiler"

import type {
    ConfigOutput,
    ConfigCallbacks,
    RequiredNonNullable,
} from "./types.js"
import { isFileIgnored } from "./isFileIgnored.js"
import { transformer } from "./transformer.js"
import { modifyFinalHtml } from "./modifyFinalHtml.js"

export const markupPreprocessor = (
    config: ConfigOutput,
    callbacks: ConfigCallbacks | undefined
) => {
    return (async (options) => {
        if (isFileIgnored(options.filename, config)) return

        // NOTE: I have verified that `filename` is not `undefined` but TypeScript doesn't understand it.
        const options_ = options as RequiredNonNullable<typeof options>

        if (callbacks?.onFileIgnore?.(options_)) return

        const markdownResult = await transformer(config, options_)

        const html = modifyFinalHtml(
            markdownResult.value.toString(),
            markdownResult.data
        )

        return { code: html }
    }) satisfies MarkupPreprocessor
}
