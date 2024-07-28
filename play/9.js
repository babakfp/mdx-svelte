import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { preprocessMarkup } from "../dist/utils/preprocessMarkup.js"

const mdxPreprocessOptions = mdxPreprocessSchema.parse({
    globalImports: [
        {
            context: "module",
            imports: ["import * from 'example-context-module'"],
        },
        {
            imports: ["import * from 'example'"],
        },
    ],
})

const FILE_CONTENT = ``

const result = await preprocessMarkup(
    { content: FILE_CONTENT },
    mdxPreprocessOptions,
)

console.dir(result)
