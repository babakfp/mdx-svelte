import type { VFile } from "vfile"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import remarkRehype from "remark-rehype"
import rehypeShiki from "@shikijs/rehype"
import rehypeExternalLinks from "rehype-external-links"
import rehypeStringify from "rehype-stringify"

import { ConfigOutput } from "./types.js"
import { isHrefExternal } from "./isHrefExternal.js"

export const transformer = async (
    markdown: string,
    config: ConfigOutput
): Promise<VFile["value"]> => {
    const processor = unified()

    processor.use(remarkParse, config.builtInPlugins.remarkParse.options)

    if (config.builtInPlugins.remarkGfm.enable) {
        processor.use(remarkGfm, config.builtInPlugins.remarkGfm.options)
    }

    if (config.builtInPlugins.remarkUnwrapImages.enable) {
        processor.use(remarkUnwrapImages)
    }

    processor.use(remarkRehype, {
        ...config.builtInPlugins.remarkRehype.options,
        allowDangerousHtml: true,
    })

    if (config.builtInPlugins.rehypeShiki.enable) {
        processor.use(rehypeShiki, {
            themes: {
                light: "vitesse-light",
                dark: "vitesse-dark",
            },
            ...config.builtInPlugins.rehypeShiki.options,
        })
    }

    if (config.builtInPlugins.rehypeExternalLinks.enable) {
        processor.use(rehypeExternalLinks, {
            rel: (element) => {
                if (isHrefExternal(element.properties.href?.toString())) {
                    return ["nofollow", "noopener", "noreferrer"].join(" ")
                }
            },
            target: (element) => {
                if (isHrefExternal(element.properties.href?.toString())) {
                    return "_blank"
                }
            },
            ...config.builtInPlugins.rehypeExternalLinks.options,
        })
    }

    processor.use(rehypeStringify, {
        ...config.builtInPlugins.rehypeStringify.options,
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
    })

    const result = await processor.process(markdown)

    return result.value
}
