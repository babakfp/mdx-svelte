import type { MarkupPreprocessor } from "svelte/compiler"
import type { Data } from "vfile"
import type { MdxPreprocessOptionsOutput } from "../mdxPreprocess/types.js"
import { unifiedTransformer } from "../transformers/unified/index.js"

export const preprocessMarkup = async (
    options: Parameters<MarkupPreprocessor>[0],
    config: MdxPreprocessOptionsOutput,
) => {
    if (ignoreFile(options.filename, config)) return
    if (config?.onFileIgnore?.(options)) return

    const transformResult = await (config?.onTransform?.(options, config) ??
        unifiedTransformer(options, config))

    const newContent = replaceMdxDataPlaceholderWithData(
        transformResult.content,
        transformResult.data,
    )

    return { content: newContent, data: transformResult.data }
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

const replaceMdxDataPlaceholderWithData = (content: string, data: Data) => {
    return content.replace("__mdx__", JSON.stringify(data))
}
