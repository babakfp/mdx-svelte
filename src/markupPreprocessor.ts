import type { MarkupPreprocessor } from "svelte/compiler"

import type { ConfigOutput, RequiredNonNullable } from "./types/index.js"
import { isFileIgnored } from "./isFileIgnored.js"
import { transformer } from "./transformers/unified/index.js"
import { modifyFinalHtml } from "./modifyFinalHtml.js"

export const markupPreprocessor = (config: ConfigOutput) => {
    return (async (options) => {
        if (isFileIgnored(options.filename, config)) return

        // NOTE: I've verified that `filename` isn't `undefined` in the above code, but TypeScript doesn't understand it, so I added `as` to shut it off!
        const options_ = options as RequiredNonNullable<typeof options>

        if (config?.onFileIgnore?.(options_)) return

        const markdownResult =
            (await config?.onTransform?.(options_, config)) ||
            (await transformer(options_, config))

        if (!markdownResult) return

        const html = modifyFinalHtml(
            markdownResult.content,
            markdownResult.data
        )

        return { code: html }
    }) satisfies MarkupPreprocessor
}
