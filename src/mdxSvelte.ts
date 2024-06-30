import type { PreprocessorGroup } from "svelte/compiler"
import { markupToMdx } from "./markupToMdx.js"
import { mdxSvelteSchema } from "./schemas/index.js"
import type { MdxSvelteConfigSchemaInput } from "./types/index.js"

export const mdxSvelte = (config?: MdxSvelteConfigSchemaInput) => {
    const config_ = mdxSvelteSchema.parse(config)

    return {
        name: "mdx-svelte",
        markup: markupToMdx(config_),
    } satisfies PreprocessorGroup
}
