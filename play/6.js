import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { preprocessMarkup } from "../dist/utils/preprocessMarkup.js"

const mdxPreprocessConfig1 = mdxPreprocessSchema.parse()

const FILE_CONTENT = `<script context="module">
    const message = "Hello world!"
</script>`

const result = await preprocessMarkup(
    { content: FILE_CONTENT },
    mdxPreprocessConfig1,
)

console.dir(result)
