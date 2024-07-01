import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { unifiedTransformer } from "../dist/transformers/unified/index.js"
import { ConfigSchema as TransformerSchema } from "../dist/transformers/unified/schemas/index.js"

const mdxPreprocessConfig = mdxPreprocessSchema.parse()
const transformerConfig = TransformerSchema.parse()

const yaml = `---
title: Hello World
---`

const toml = `+++
title = "Hello World"
+++`

const content = yaml

await unifiedTransformer({ content }, mdxPreprocessConfig, transformerConfig)
