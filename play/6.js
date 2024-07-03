import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { preprocessMarkup } from "../dist/utils/preprocessMarkup.js"

const mdxPreprocessOptions = mdxPreprocessSchema.parse()

const FILE_CONTENT = `<script context="module">
    const message = "Hello world!"
</script>`

const result = await preprocessMarkup(
    { content: FILE_CONTENT },
    mdxPreprocessOptions,
)

console.dir(result)
