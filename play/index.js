import { mdxSvelteSchema } from "../dist/schemas/index.js"
import { transformer } from "../dist/transformers/unified/index.js"
import { ConfigSchema as TransformerSchema } from "../dist/transformers/unified/schemas/index.js"

const mdxSvelteConfig = mdxSvelteSchema.parse()
const transformerConfig = TransformerSchema.parse()

const yaml = `---
title: Hello World
---`

const toml = `+++
title = "Hello World"
+++`

const content = yaml

await transformer({ content }, mdxSvelteConfig, transformerConfig)
