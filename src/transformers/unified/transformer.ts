import rehypeShiki from "@shikijs/rehype"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkFrontmatter from "remark-frontmatter"
import remarkFrontmatterYaml from "remark-frontmatter-yaml"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse" // Options not needed because `Options: {}`.
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import remarkUnwrapImages from "remark-unwrap-images" // No `Options` export.
import { unified } from "unified"
import type {
    MarkupPreprocessorOptions,
    MdxPreprocessConfigSchemaInput,
    MdxPreprocessConfigSchemaOutput,
    RequiredNonNullable,
} from "../../types/index.js"
import { isHrefExternal } from "./isHrefExternal.js"
import rehypeMarkdownElementsCheapStrategy from "./plugins/rehype-markdown-elements-cheap-strategy.js" // No `Options` export.
import rehypeMarkdownElementsContext from "./plugins/rehype-markdown-elements-context.js" // No `Options` export.
import rehypeMarkdownElementsExpensiveStrategy from "./plugins/rehype-markdown-elements-expensive-strategy.js" // No `Options` export.
import rehypeSanitizeCodeElement from "./plugins/rehype-sanitize-code-element.js" // No `Options` export.
import remarkGithubAlerts from "./plugins/remark-github-alerts/src/index.js"
import remarkHtmlAttributeCurlyBracket from "./plugins/remark-html-attribute-curly-bracket.js"
import remarkSvelteSpecialTags from "./plugins/remark-svelte-special-tags.js"
import remarkTextToHtml from "./plugins/remark-text-to-html.js"
import remarkUnwrapHtml from "./plugins/remark-unwrap-html.js"
import { ConfigSchema } from "./schemas/index.js"
import type { UnifiedTransformerConfigSchemaInput } from "./types/index.js"

/**
 * This is a transformer that uses unified ecosystem.
 */
export const transformer = (async (
    markupPreprocessorOptions: RequiredNonNullable<MarkupPreprocessorOptions>,
    mdxPreprocessConfig: MdxPreprocessConfigSchemaOutput,
    config?: UnifiedTransformerConfigSchemaInput,
) => {
    const config_ = ConfigSchema.parse(config)

    const processor = unified()

    processor.use(() => (_, file) => {
        file.data.frontmatter = {}
    })

    processor.use(remarkParse)

    processor.use(remarkHtmlAttributeCurlyBracket)

    processor.use(remarkSvelteSpecialTags)

    processor.use(remarkUnwrapHtml)

    processor.use(remarkTextToHtml)

    processor.use(config_.builtInPlugins.remarkFrontmatter.plugins?.before)
    if (config_.builtInPlugins.remarkFrontmatter.enable) {
        processor.use(
            remarkFrontmatter,
            config_.builtInPlugins.remarkFrontmatter.options,
        )
    }
    processor.use(config_.builtInPlugins.remarkFrontmatter.plugins?.after)

    processor.use(config_.builtInPlugins.remarkFrontmatterYaml.plugins?.before)
    if (config_.builtInPlugins.remarkFrontmatterYaml.enable) {
        processor.use(
            remarkFrontmatterYaml,
            config_.builtInPlugins.remarkFrontmatterYaml.options,
        )
    }
    processor.use(config_.builtInPlugins.remarkFrontmatterYaml.plugins?.after)

    processor.use(config_.builtInPlugins.remarkGfm.plugins?.before)
    if (config_.builtInPlugins.remarkGfm.enable) {
        processor.use(remarkGfm, config_.builtInPlugins.remarkGfm.options)
    }
    processor.use(config_.builtInPlugins.remarkGfm.plugins?.after)

    processor.use(config_.builtInPlugins.remarkGithubAlerts.plugins?.before)
    if (config_.builtInPlugins.remarkGithubAlerts.enable) {
        processor.use(
            remarkGithubAlerts,
            config_.builtInPlugins.remarkGithubAlerts.options,
        )
    }
    processor.use(config_.builtInPlugins.remarkGithubAlerts.plugins?.after)

    processor.use(config_.builtInPlugins.remarkUnwrapImages.plugins?.before)
    if (config_.builtInPlugins.remarkUnwrapImages.enable) {
        processor.use(remarkUnwrapImages)
    }
    processor.use(config_.builtInPlugins.remarkUnwrapImages.plugins?.after)

    processor.use(config_.builtInPlugins.remarkToc.plugins?.before)
    if (config_.builtInPlugins.remarkToc.enable) {
        processor.use(remarkToc)
    }
    processor.use(config_.builtInPlugins.remarkToc.plugins?.after)

    processor.use(config_.builtInPlugins.remarkRehype.plugins?.before)
    processor.use(remarkRehype, {
        ...config_.builtInPlugins.remarkRehype.options,
        allowDangerousHtml: true,
    })
    processor.use(config_.builtInPlugins.remarkRehype.plugins?.after)

    processor.use(
        config_.builtInPlugins.rehypeMarkdownElementsContext.plugins?.before,
    )
    processor.use(rehypeMarkdownElementsContext)
    processor.use(
        config_.builtInPlugins.rehypeMarkdownElementsContext.plugins?.after,
    )

    processor.use(config_.builtInPlugins.rehypeSlug.plugins?.before)
    if (config_.builtInPlugins.rehypeSlug.enable) {
        processor.use(rehypeSlug, config_.builtInPlugins.rehypeSlug.options)
    }
    processor.use(config_.builtInPlugins.rehypeSlug.plugins?.after)

    processor.use(config_.builtInPlugins.rehypeAutolinkHeadings.plugins?.before)
    if (config_.builtInPlugins.rehypeAutolinkHeadings.enable) {
        processor.use(
            rehypeAutolinkHeadings,
            config_.builtInPlugins.rehypeAutolinkHeadings.options,
        )
    }
    processor.use(config_.builtInPlugins.rehypeAutolinkHeadings.plugins?.after)

    processor.use(config_.builtInPlugins.rehypeShiki.plugins?.before)
    if (config_.builtInPlugins.rehypeShiki.enable) {
        processor.use(rehypeShiki, {
            theme: "github-dark",
            ...config_.builtInPlugins.rehypeShiki.options,
        })
    }
    processor.use(config_.builtInPlugins.rehypeShiki.plugins?.after)

    processor.use(
        config_.builtInPlugins.rehypeSanitizeCodeElement.plugins?.before,
    )
    processor.use(rehypeSanitizeCodeElement)
    processor.use(
        config_.builtInPlugins.rehypeSanitizeCodeElement.plugins?.after,
    )

    processor.use(config_.builtInPlugins.rehypeMarkdownElements.plugins?.before)
    if (config_.builtInPlugins.rehypeMarkdownElements.enable) {
        if (mdxPreprocessConfig.markdownElementsStrategy === "expensive") {
            processor.use(rehypeMarkdownElementsExpensiveStrategy)
        }
        if (mdxPreprocessConfig.markdownElementsStrategy === "cheap") {
            processor.use(
                rehypeMarkdownElementsCheapStrategy,
                mdxPreprocessConfig,
            )
        }
    }
    processor.use(config_.builtInPlugins.rehypeMarkdownElements.plugins?.after)

    processor.use(config_.builtInPlugins.rehypeExternalLinks.plugins?.before)
    if (config_.builtInPlugins.rehypeExternalLinks.enable) {
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
            ...config_.builtInPlugins.rehypeExternalLinks.options,
        })
    }
    processor.use(config_.builtInPlugins.rehypeExternalLinks.plugins?.after)

    processor.use(config_.builtInPlugins.rehypeStringify.plugins?.before)
    processor.use(rehypeStringify, {
        ...config_.builtInPlugins.rehypeStringify.options,
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
        allowParseErrors: true,
    })
    processor.use(config_.builtInPlugins.rehypeStringify.plugins?.after)

    const result = await processor.process(markupPreprocessorOptions.content)

    return {
        content: result.value.toString(),
        data: result.data,
    }
}) satisfies MdxPreprocessConfigSchemaInput["onTransform"]
