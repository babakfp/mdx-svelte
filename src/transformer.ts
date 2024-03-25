import { unified } from "unified"
import remarkParse from "remark-parse" // Options not needed because `Options: {}`.
import remarkFrontmatter from "remark-frontmatter"
import remarkFrontmatterYaml from "remark-frontmatter-yaml"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images" // No `Options` export.
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeShiki from "@shikijs/rehype"
import rehypeSanitizeCodeElement from "./rehype-sanitize-code-element.js" // No `Options` export.
import rehypeExternalLinks from "rehype-external-links"
import rehypeCustomMarkdownElements from "./rehype-custom-markdown-elements.js" // No `Options` export.
import rehypeStringify from "rehype-stringify"

import type {
    RequiredNonNullable,
    ConfigOutput,
    MarkupPreprocessorOptions,
} from "./types.js"
import { isHrefExternal } from "./isHrefExternal.js"

export const transformer = async (
    config: ConfigOutput,
    markupPreprocessorOptions: RequiredNonNullable<MarkupPreprocessorOptions>
) => {
    const processor = unified()

    processor.use(remarkParse)

    // ---

    processor.use(config.builtInPlugins.remarkFrontmatter.plugins?.before)
    if (config.builtInPlugins.remarkFrontmatter.enable) {
        processor.use(remarkFrontmatter, {
            type: config.builtInPlugins.remarkFrontmatter.lang,
            fence: { open: "---", close: "---" },
            ...config.builtInPlugins.remarkFrontmatter.options,
        })
    }
    processor.use(config.builtInPlugins.remarkFrontmatter.plugins?.after)

    // ---

    processor.use(config.builtInPlugins.remarkFrontmatterYaml.plugins?.before)
    if (
        config.builtInPlugins.remarkFrontmatter.enable &&
        config.builtInPlugins.remarkFrontmatterYaml.enable
    ) {
        processor.use(
            remarkFrontmatterYaml,
            config.builtInPlugins.remarkFrontmatterYaml.options
        )
    }
    processor.use(config.builtInPlugins.remarkFrontmatterYaml.plugins?.after)

    // ---

    processor.use(config.builtInPlugins.remarkGfm.plugins?.before)
    if (config.builtInPlugins.remarkGfm.enable) {
        processor.use(remarkGfm, config.builtInPlugins.remarkGfm.options)
    }
    processor.use(config.builtInPlugins.remarkGfm.plugins?.after)

    // ---

    processor.use(config.builtInPlugins.remarkUnwrapImages.plugins?.before)
    if (config.builtInPlugins.remarkUnwrapImages.enable) {
        processor.use(remarkUnwrapImages)
    }
    processor.use(config.builtInPlugins.remarkUnwrapImages.plugins?.after)

    // ---

    processor.use(config.builtInPlugins.remarkRehype.plugins?.before)
    processor.use(remarkRehype, {
        ...config.builtInPlugins.remarkRehype.options,
        allowDangerousHtml: true,
    })
    processor.use(config.builtInPlugins.remarkRehype.plugins?.after)

    // ---

    processor.use(config.builtInPlugins.rehypeSlug.plugins?.before)
    if (config.builtInPlugins.rehypeSlug.enable) {
        processor.use(rehypeSlug, config.builtInPlugins.rehypeSlug.options)
    }
    processor.use(config.builtInPlugins.rehypeSlug.plugins?.after)

    // ---

    processor.use(config.builtInPlugins.rehypeAutolinkHeadings.plugins?.before)
    if (config.builtInPlugins.rehypeAutolinkHeadings.enable) {
        processor.use(
            rehypeAutolinkHeadings,
            config.builtInPlugins.rehypeAutolinkHeadings.options
        )
    }
    processor.use(config.builtInPlugins.rehypeAutolinkHeadings.plugins?.after)

    // ---

    processor.use(config.builtInPlugins.rehypeShiki.plugins?.before)
    if (config.builtInPlugins.rehypeShiki.enable) {
        processor.use(rehypeShiki, {
            theme: "github-dark",
            ...config.builtInPlugins.rehypeShiki.options,
        })
    }
    processor.use(config.builtInPlugins.rehypeShiki.plugins?.after)

    // ---

    processor.use(
        config.builtInPlugins.rehypeSanitizeCodeElement.plugins?.before
    )
    processor.use(rehypeSanitizeCodeElement)
    processor.use(
        config.builtInPlugins.rehypeSanitizeCodeElement.plugins?.after
    )

    // ---

    processor.use(config.builtInPlugins.rehypeExternalLinks.plugins?.before)
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
    processor.use(config.builtInPlugins.rehypeExternalLinks.plugins?.after)

    // ---

    processor.use(
        config.builtInPlugins.rehypeCustomMarkdownElements.plugins?.before
    )
    if (config.MarkdownElements.length) {
        processor.use(rehypeCustomMarkdownElements, config)
    }
    processor.use(
        config.builtInPlugins.rehypeCustomMarkdownElements.plugins?.after
    )

    // ---

    processor.use(config.builtInPlugins.rehypeStringify.plugins?.before)
    processor.use(rehypeStringify, {
        ...config.builtInPlugins.rehypeStringify.options,
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
    })
    processor.use(config.builtInPlugins.rehypeStringify.plugins?.after)

    // ---

    const result = processor.process(markupPreprocessorOptions.content)

    return result
}
