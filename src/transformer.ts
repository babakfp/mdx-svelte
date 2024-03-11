import type { VFile } from "vfile"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeShiki from "@shikijs/rehype"
import rehypeStringify from "rehype-stringify"

export const transformer = async (markdown: string): Promise<VFile> => {
    const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeShiki, {
            themes: {
                light: "vitesse-light",
                dark: "vitesse-dark",
            },
        })
        .use(rehypeStringify)
        .process(markdown)

    return file
}
