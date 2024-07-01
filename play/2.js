import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { preprocessMarkup } from "../dist/utils/preprocessMarkup.js"

const mdxPreprocessConfig = mdxPreprocessSchema.parse()

const content = `
<script></script>
<script context="module"></script>

# Hello, World!
`

const result = await preprocessMarkup({ content }, mdxPreprocessConfig)

console.dir(result)
