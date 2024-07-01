import { mdxPreprocess } from "../dist/index.js"

const FILE_CONTENT = `
# Hello, World!
`

const mdxMarkupPreprocess = mdxPreprocess()

const result = await mdxMarkupPreprocess.markup({
    content: FILE_CONTENT,
})

console.log(result.code)
