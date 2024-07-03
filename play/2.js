import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { preprocessMarkup } from "../dist/utils/preprocessMarkup.js"

const mdxPreprocessOptions = mdxPreprocessSchema.parse()

const content = `
<script></script>
<script context="module"></script>

# Hello, World!
`

const result = await preprocessMarkup({ content }, mdxPreprocessOptions)

console.dir(result)
