import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { unifiedTransformer } from "../dist/transformers/unified/index.js"
import { unifiedTransformerSchema } from "../dist/transformers/unified/schema.js"

const mdxPreprocessOptions = mdxPreprocessSchema.parse()
const unifiedTransformerOptions = unifiedTransformerSchema.parse()

const yaml = `---
title: Hello World
---`

const toml = `+++
title = "Hello World"
+++`

const content = yaml

await unifiedTransformer(
    { content },
    mdxPreprocessOptions,
    unifiedTransformerOptions,
)
