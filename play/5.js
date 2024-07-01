import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { unifiedTransformer } from "../dist/transformers/unified/index.js"
import { preprocessMarkup } from "../dist/utils/preprocessMarkup.js"

const mdxPreprocessConfig1 = mdxPreprocessSchema.parse()
const mdxPreprocessConfig2 = mdxPreprocessSchema.parse({
    onTransform: (options, config) => {
        return unifiedTransformer(options, config, {
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
    mdxPreprocessConfig1,
)
const result2 = await preprocessMarkup(
    { content: FILE_CONTENT },
    mdxPreprocessConfig2,
)

console.dir(result1)
console.dir(result2)
