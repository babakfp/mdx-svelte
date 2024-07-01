import type { PreprocessorGroup } from "svelte/compiler"
import { preprocessMarkupToMdx } from "../utils/preprocessMarkupToMdx.js"
import { mdxPreprocessSchema } from "./schema.js"
import type { MdxPreprocessOptionsInput } from "./types.js"

export const mdxPreprocess = (options?: MdxPreprocessOptionsInput) => {
    const parsedOptions = mdxPreprocessSchema.parse(options)

    return {
        name: "mdx-svelte",
        markup: preprocessMarkupToMdx(parsedOptions),
    } satisfies PreprocessorGroup
}
