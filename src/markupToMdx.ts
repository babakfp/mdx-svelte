import type { MarkupPreprocessor } from "svelte/compiler"
import { isFileIgnored } from "./isFileIgnored.js"
import { modifyFinalHtml } from "./modifyFinalHtml.js"
import { transformer } from "./transformers/unified/index.js"
import type {
    MdxPreprocessConfigSchemaOutput,
    RequiredNonNullable,
} from "./types/index.js"

export const markupToMdx = (config: MdxPreprocessConfigSchemaOutput) => {
    return (async (options) => {
        if (!options.content.trim()) return
        if (isFileIgnored(options.filename, config)) return

        // NOTE: I've verified that `filename` isn't `undefined` in the above code, but TypeScript doesn't understand it, so I added `as` to shut it off!
        const options_ = options as RequiredNonNullable<typeof options>

        if (config?.onFileIgnore?.(options_)) return

        const transformationResult =
            (await config?.onTransform?.(options_, config)) ||
            (await transformer(options_, config))

        if (!transformationResult) return

        const code = modifyFinalHtml(
            transformationResult.content,
            transformationResult.data,
        )

        return { code }
    }) satisfies MarkupPreprocessor
}
