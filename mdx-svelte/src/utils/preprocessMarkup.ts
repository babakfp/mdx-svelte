import type { MarkupPreprocessor } from "svelte/compiler"
import type { Data } from "vfile"
import type { MdxPreprocessOptionsOutput } from "../mdxPreprocess/types.js"
import { unifiedTransformer } from "../transformers/unified/index.js"

export const preprocessMarkup = async (
    markup: Parameters<MarkupPreprocessor>[0],
    options: MdxPreprocessOptionsOutput,
) => {
    if (ignoreFile(markup.filename, options)) return
    if (options?.onFileIgnore?.(markup)) return

    const transformResult = await (options?.onTransform?.(markup, options) ??
        unifiedTransformer(markup, options))

    const newContent = replaceMdxDataPlaceholderWithData(
        transformResult.content,
        transformResult.data,
    )

    return { content: newContent, data: transformResult.data }
}

const ignoreFile = (
    filename: Parameters<MarkupPreprocessor>[0]["filename"],
    options: MdxPreprocessOptionsOutput,
) => {
    if (!filename) return false

    if (filename.includes("/.svelte-kit/")) return true

    if (!options.extensions.some((extension) => filename.endsWith(extension))) {
        return true
    }

    if (
        filename.includes("/node_modules/") &&
        !options.preprocessDependencies.some((dep) =>
            filename.includes(`/node_modules/${dep}/`),
        )
    ) {
        return true
    }
}

const replaceMdxDataPlaceholderWithData = (content: string, data: Data) => {
    return content.replace("__mdx__", JSON.stringify(data))
}
