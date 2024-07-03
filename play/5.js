import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { unifiedTransformer } from "../dist/transformers/unified/index.js"
import { preprocessMarkup } from "../dist/utils/preprocessMarkup.js"

const mdxPreprocessOptions1 = mdxPreprocessSchema.parse()
const mdxPreprocessOptions2 = mdxPreprocessSchema.parse({
    onTransform: (markup, options) => {
        return unifiedTransformer(markup, options, {
            builtInPlugins: {
                rehypeShiki: {
                    enable: false,
                },
            },
        })
    },
})

const FILE_CONTENT = `---
title: Hello, World!
---
`

const result1 = await preprocessMarkup(
    { content: FILE_CONTENT },
    mdxPreprocessOptions1,
)
const result2 = await preprocessMarkup(
    { content: FILE_CONTENT },
    mdxPreprocessOptions2,
)

console.dir(result1)
console.dir(result2)
