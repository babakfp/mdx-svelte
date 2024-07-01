import type { MarkupPreprocessor } from "svelte/compiler"
import type { MdxPreprocessOptionsOutput } from "../mdxPreprocess/types.js"
import { unifiedTransformer } from "../transformers/unified/index.js"
import { replaceMdxDataPlaceholderWithData } from "./replaceMdxDataPlaceholderWithData.js"

export const preprocessMarkupToMdx = (config: MdxPreprocessOptionsOutput) => {
    return (async (options) => {
        if (!options.content.trim()) {
            return { code: "" }
        }

        if (ignoreFile(options.filename, config)) return
        if (config?.onFileIgnore?.(options)) return

        const result = await (config?.onTransform?.(options, config) ??
            unifiedTransformer(options, config))

        const code = replaceMdxDataPlaceholderWithData(
            result.content,
            result.data,
        )

        return { code }
    }) satisfies MarkupPreprocessor
}

const ignoreFile = (
    filename: Parameters<MarkupPreprocessor>[0]["filename"],
    config: MdxPreprocessOptionsOutput,
) => {
    if (!filename) return false

    if (filename.includes("/.svelte-kit/")) return true

    if (!config.extensions.some((extension) => filename.endsWith(extension))) {
        return true
    }

    if (
        filename.includes("/node_modules/") &&
        !config.preprocessDependencies.some((dep) =>
            filename.includes(`/node_modules/${dep}/`),
        )
    ) {
        return true
    }
}
