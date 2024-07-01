import type { MarkupPreprocessor } from "svelte/compiler"
import type { MdxPreprocessOptionsOutput } from "../mdxPreprocess/types.js"
import { preprocessMarkup } from "./preprocessMarkup.js"

export const markupPreprocess = (config: MdxPreprocessOptionsOutput) => {
    return (async (options) => {
        const preprocessResult = await preprocessMarkup(options, config)
        if (!preprocessResult) return
        return { code: preprocessResult.content }
    }) satisfies MarkupPreprocessor
}
