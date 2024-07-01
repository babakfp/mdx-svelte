import type { MarkupPreprocessor } from "svelte/compiler"
import type { MdxPreprocessOptionsOutput } from "../mdxPreprocess/types.js"
import { transformer } from "../transformers/unified/index.js"
import { replaceMdxDataPlaceholderWithData } from "./replaceMdxDataPlaceholderWithData.js"
import { shouldPreprocessFile } from "./shouldPreprocessFile.js"

export const preprocessMarkupToMdx = (config: MdxPreprocessOptionsOutput) => {
    return (async (options) => {
        const file = shouldPreprocessFile(options, config)
        if (!file || config?.onFileIgnore?.(file)) return

        const result = await (config?.onTransform?.(file, config) ??
            transformer(file, config))

        const code = replaceMdxDataPlaceholderWithData(
            result.content,
            result.data,
        )

        return { code }
    }) satisfies MarkupPreprocessor
}
