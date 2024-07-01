import { mdxPreprocess } from "../dist/index.js"

const FILE_NAME = "./play/1.svelte.md"
const FILE_CONTENT = `
# Hello, World!
`

const mdxMarkupPreprocess = mdxPreprocess()

const { code } = await mdxMarkupPreprocess.markup({
    filename: FILE_NAME,
    content: FILE_CONTENT,
})

console.log(code)
