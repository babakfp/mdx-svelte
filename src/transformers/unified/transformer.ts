import rehypeShiki from "@shikijs/rehype"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkFrontmatter from "remark-frontmatter"
import remarkFrontmatterYaml from "remark-frontmatter-yaml"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import remarkUnwrapImages from "remark-unwrap-images"
import type { MarkupPreprocessor } from "svelte/compiler"
import { unified } from "unified"
import type {
    MdxPreprocessOptionsInput,
    MdxPreprocessOptionsOutput,
} from "../../mdxPreprocess/types.js"
import { isHrefExternal } from "./isHrefExternal.js"
import rehypeCustomMarkdownElements from "./plugins/rehype-custom-markdown-elements.js"
import rehypeSanitizeCodeElement from "./plugins/rehype-sanitize-code-element.js"
import remarkGithubAlerts from "./plugins/remark-github-alerts/src/index.js"
import remarkHtmlAttributeCurlyBracket from "./plugins/remark-html-attribute-curly-bracket.js"
import remarkMdxDataAndCustomElements from "./plugins/remark-mdx-data-and-custom-elements.js"
import remarkSvelteSpecialTags from "./plugins/remark-svelte-special-tags.js"
import remarkTextToHtml from "./plugins/remark-text-to-html.js"
import remarkUnwrapHtml from "./plugins/remark-unwrap-html.js"
import { unifiedTransformerSchema } from "./schema.js"
import type { UnifiedTransformerOptionsInput } from "./types.js"

/**
 * A transformer that uses unified ecosystem.
 */
export const unifiedTransformer = (async (
    markupPreprocessorOptions: Parameters<MarkupPreprocessor>[0],
    mdxPreprocessConfig: MdxPreprocessOptionsOutput,
    options?: UnifiedTransformerOptionsInput,
) => {
    const parsedOptions = unifiedTransformerSchema.parse(options)

    const processor = unified()

    processor.use(remarkMdxDataAndCustomElements)

    processor.use(remarkParse)

    processor.use(remarkHtmlAttributeCurlyBracket)

    processor.use(remarkSvelteSpecialTags)

    processor.use(remarkUnwrapHtml)

    processor.use(remarkTextToHtml)

    processor.use(
        parsedOptions.builtInPlugins.remarkFrontmatter.plugins?.before,
    )
    if (parsedOptions.builtInPlugins.remarkFrontmatter.enable) {
        processor.use(
            remarkFrontmatter,
            parsedOptions.builtInPlugins.remarkFrontmatter.options,
        )
    }
    processor.use(parsedOptions.builtInPlugins.remarkFrontmatter.plugins?.after)

    processor.use(
        parsedOptions.builtInPlugins.remarkFrontmatterYaml.plugins?.before,
    )
    if (parsedOptions.builtInPlugins.remarkFrontmatterYaml.enable) {
        processor.use(
            remarkFrontmatterYaml,
            parsedOptions.builtInPlugins.remarkFrontmatterYaml.options,
        )
    }
    processor.use(
        parsedOptions.builtInPlugins.remarkFrontmatterYaml.plugins?.after,
    )

    processor.use(parsedOptions.builtInPlugins.remarkGfm.plugins?.before)
    if (parsedOptions.builtInPlugins.remarkGfm.enable) {
        processor.use(remarkGfm, parsedOptions.builtInPlugins.remarkGfm.options)
    }
    processor.use(parsedOptions.builtInPlugins.remarkGfm.plugins?.after)

    processor.use(
        parsedOptions.builtInPlugins.remarkGithubAlerts.plugins?.before,
    )
    if (parsedOptions.builtInPlugins.remarkGithubAlerts.enable) {
        processor.use(
            remarkGithubAlerts,
            parsedOptions.builtInPlugins.remarkGithubAlerts.options,
        )
    }
    processor.use(
        parsedOptions.builtInPlugins.remarkGithubAlerts.plugins?.after,
    )

    processor.use(
        parsedOptions.builtInPlugins.remarkUnwrapImages.plugins?.before,
    )
    if (parsedOptions.builtInPlugins.remarkUnwrapImages.enable) {
        processor.use(remarkUnwrapImages)
    }
    processor.use(
        parsedOptions.builtInPlugins.remarkUnwrapImages.plugins?.after,
    )

    processor.use(parsedOptions.builtInPlugins.remarkToc.plugins?.before)
    if (parsedOptions.builtInPlugins.remarkToc.enable) {
        processor.use(remarkToc)
    }
    processor.use(parsedOptions.builtInPlugins.remarkToc.plugins?.after)

    processor.use(parsedOptions.builtInPlugins.remarkRehype.plugins?.before)
    processor.use(remarkRehype, {
        ...parsedOptions.builtInPlugins.remarkRehype.options,
        allowDangerousHtml: true,
    })
    processor.use(parsedOptions.builtInPlugins.remarkRehype.plugins?.after)

    processor.use(parsedOptions.builtInPlugins.rehypeSlug.plugins?.before)
    if (parsedOptions.builtInPlugins.rehypeSlug.enable) {
        processor.use(
            rehypeSlug,
            parsedOptions.builtInPlugins.rehypeSlug.options,
        )
    }
    processor.use(parsedOptions.builtInPlugins.rehypeSlug.plugins?.after)

    processor.use(
        parsedOptions.builtInPlugins.rehypeAutolinkHeadings.plugins?.before,
    )
    if (parsedOptions.builtInPlugins.rehypeAutolinkHeadings.enable) {
        processor.use(
            rehypeAutolinkHeadings,
            parsedOptions.builtInPlugins.rehypeAutolinkHeadings.options,
        )
    }
    processor.use(
        parsedOptions.builtInPlugins.rehypeAutolinkHeadings.plugins?.after,
    )

    processor.use(parsedOptions.builtInPlugins.rehypeShiki.plugins?.before)
    if (parsedOptions.builtInPlugins.rehypeShiki.enable) {
        processor.use(rehypeShiki, {
            theme: "github-dark",
            ...parsedOptions.builtInPlugins.rehypeShiki.options,
        })
    }
    processor.use(parsedOptions.builtInPlugins.rehypeShiki.plugins?.after)

    processor.use(
        parsedOptions.builtInPlugins.rehypeSanitizeCodeElement.plugins?.before,
    )
    processor.use(rehypeSanitizeCodeElement)
    processor.use(
        parsedOptions.builtInPlugins.rehypeSanitizeCodeElement.plugins?.after,
    )

    processor.use(
        parsedOptions.builtInPlugins.rehypeCustomMarkdownElements.plugins
            ?.before,
    )
    if (parsedOptions.builtInPlugins.rehypeCustomMarkdownElements.enable) {
        processor.use(rehypeCustomMarkdownElements, mdxPreprocessConfig)
    }
    processor.use(
        parsedOptions.builtInPlugins.rehypeCustomMarkdownElements.plugins
            ?.after,
    )

    processor.use(
        parsedOptions.builtInPlugins.rehypeExternalLinks.plugins?.before,
    )
    if (parsedOptions.builtInPlugins.rehypeExternalLinks.enable) {
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
            ...parsedOptions.builtInPlugins.rehypeExternalLinks.options,
        })
    }
    processor.use(
        parsedOptions.builtInPlugins.rehypeExternalLinks.plugins?.after,
    )

    processor.use(parsedOptions.builtInPlugins.rehypeStringify.plugins?.before)
    processor.use(rehypeStringify, {
        ...parsedOptions.builtInPlugins.rehypeStringify.options,
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
        allowParseErrors: true,
    })
    processor.use(parsedOptions.builtInPlugins.rehypeStringify.plugins?.after)

    const result = await processor.process(markupPreprocessorOptions.content)

    return {
        content: result.value.toString(),
        data: result.data,
    }
}) satisfies MdxPreprocessOptionsInput["onTransform"]
