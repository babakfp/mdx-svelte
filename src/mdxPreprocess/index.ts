import type { PreprocessorGroup } from "svelte/compiler"
import { markupPreprocess } from "../utils/markupPreprocess.js"
import { mdxPreprocessSchema } from "./schema.js"
import type { MdxPreprocessOptionsInput } from "./types.js"

export const mdxPreprocess = (options?: MdxPreprocessOptionsInput) => {
    const parsedOptions = mdxPreprocessSchema.parse(options)

    return {
        name: "mdx-svelte",
        markup: markupPreprocess(parsedOptions),
    } satisfies PreprocessorGroup
}
