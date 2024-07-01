import type { MarkupPreprocessor } from "svelte/compiler"
import type { MdxPreprocessOptionsOutput } from "../mdxPreprocess/types.js"

// This is used to prevent some files from being preprocessed.
export const shouldPreprocessFile = (
    options: Parameters<MarkupPreprocessor>[0],
    config: MdxPreprocessOptionsOutput,
) => {
    if (!options.content.trim()) return false
    if (options.filename?.includes("/.svelte-kit/")) return false

    if (
        !config.extensions.some((extension) =>
            options.filename?.endsWith(extension),
        )
    ) {
        return false
    }

    if (
        options.filename?.includes("/node_modules/") &&
        !config.preprocessDependencies.some((dep) =>
            options.filename?.includes(`/node_modules/${dep}/`),
        )
    ) {
        return false
    }
}
