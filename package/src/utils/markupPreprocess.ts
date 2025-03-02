import type { MarkupPreprocessor } from "svelte/compiler"
import type { MdxPreprocessOptionsOutput } from "../mdxPreprocess/types.js"
import { preprocessMarkup } from "./preprocessMarkup.js"

export const markupPreprocess = (options: MdxPreprocessOptionsOutput) => {
    return (async (markup) => {
        const preprocessResult = await preprocessMarkup(markup, options)
        if (!preprocessResult) return
        return { code: preprocessResult.content }
    }) satisfies MarkupPreprocessor
}
