import type { VFile } from "vfile"
import { matter } from "vfile-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
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

    processor.use(remarkParse)

    if (config.builtInPlugins.remarkFrontmatter.enable) {
        processor.use(remarkFrontmatter, {
            type: config.builtInPlugins.remarkFrontmatter.lang,
            fence: { open: "---", close: "---" },
            ...config.builtInPlugins.remarkFrontmatter.options,
        })
        processor.use(() => {
            return (_tree, file) => {
                matter(file, {
                    // NOTE: The content is striped no matter the value of this option (`strip`).
                    // NOTE: The content won't be striped if the `type` option in `remarkFrontmatter` is set to anything other than `"yaml"`.
                    strip: true,
                    yaml: config.builtInPlugins.vfileMatter.options,
                })
            }
        })
    }

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

    if (config.builtInPlugins.rehypeSlug.enable) {
        processor.use(rehypeSlug, config.builtInPlugins.rehypeSlug.options)
    }

    if (config.builtInPlugins.rehypeAutolinkHeadings.enable) {
        processor.use(
            rehypeAutolinkHeadings,
            config.builtInPlugins.rehypeAutolinkHeadings.options
        )
    }

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
