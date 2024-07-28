import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { preprocessMarkup } from "../dist/utils/preprocessMarkup.js"

const mdxPreprocessOptions = mdxPreprocessSchema.parse({
    elements: [
        {
            tag: "BlockCode",
            selector: "pre code",
        },
        {
            tag: "InlineCode",
            selector: ":not(pre) code",
        },
    ],
})

const FILE_CONTENT_ONLY_INLINE_CODE = `\`console.log("Hello, World!")\``
const FILE_CONTENT_ONLY_BLOCK_CODE = `\`\`\`ts
console.log("Hello, World!")
\`\`\``

const FILE_CONTENT = FILE_CONTENT_ONLY_INLINE_CODE

const result = await preprocessMarkup(
    { content: FILE_CONTENT },
    mdxPreprocessOptions,
)

console.dir(result)
