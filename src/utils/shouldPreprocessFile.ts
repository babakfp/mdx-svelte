import type { MarkupPreprocessor } from "svelte/compiler"
import type { MdxPreprocessOptionsOutput } from "../mdxPreprocess/types.js"
import { PreprocessFile } from "../types/index.js"

// This is used to prevent some files from being preprocessed.
export const shouldPreprocessFile = (
    options: Parameters<MarkupPreprocessor>[0],
    config: MdxPreprocessOptionsOutput,
) => {
    const { filename: name, content } = options

    if (!name) return
    if (!content.trim()) return
    if (name.includes("/.svelte-kit/")) return

    if (
        name.includes("/node_modules/") &&
        !config.preprocessDependencies.some((dep) =>
            name.includes(`/node_modules/${dep}/`),
        )
    ) {
        return
    }

    if (!config.extensions.some((extension) => name.endsWith(extension))) return

    const file: PreprocessFile = { name, content }

    return file
}
