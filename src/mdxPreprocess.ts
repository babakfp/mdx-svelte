import type { PreprocessorGroup } from "svelte/compiler"
import { mdxPreprocessSchema } from "./schemas/index.js"
import type { MdxPreprocessConfigSchemaInput } from "./types/index.js"
import { markupToMdx } from "./utils/markupToMdx.js"

export const mdxPreprocess = (config?: MdxPreprocessConfigSchemaInput) => {
    const config_ = mdxPreprocessSchema.parse(config)

    return {
        name: "mdx-svelte",
        markup: markupToMdx(config_),
    } satisfies PreprocessorGroup
}
