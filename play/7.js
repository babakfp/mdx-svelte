import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { preprocessMarkup } from "../dist/utils/preprocessMarkup.js"

const mdxPreprocessOptions = mdxPreprocessSchema.parse()

const FILE_CONTENT = `\`\`\`ts
console.log("Hello, World!")
\`\`\``

const result = await preprocessMarkup(
    { content: FILE_CONTENT },
    mdxPreprocessOptions,
)

console.dir(result)
