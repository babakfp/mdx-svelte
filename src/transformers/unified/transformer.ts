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
import { isHrefExternal } from "./helpers/isHrefExternal.js"
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
    markup: Parameters<MarkupPreprocessor>[0],
    mdxPreprocessOptions: MdxPreprocessOptionsOutput,
    transformerOptions?: UnifiedTransformerOptionsInput,
) => {
    const { builtInPlugins } =
        unifiedTransformerSchema.parse(transformerOptions)

    const processor = unified()

    processor.use(remarkMdxDataAndCustomElements)

    processor.use(remarkParse)

    processor.use(remarkHtmlAttributeCurlyBracket)

    processor.use(remarkSvelteSpecialTags)

    processor.use(remarkUnwrapHtml)

    processor.use(remarkTextToHtml)

    processor.use(builtInPlugins.remarkFrontmatter.plugins?.before)
    processor.use(remarkFrontmatter, builtInPlugins.remarkFrontmatter.options)
    processor.use(builtInPlugins.remarkFrontmatter.plugins?.after)

    processor.use(builtInPlugins.remarkFrontmatterYaml.plugins?.before)
    if (builtInPlugins.remarkFrontmatterYaml.enable) {
        processor.use(
            remarkFrontmatterYaml,
            builtInPlugins.remarkFrontmatterYaml.options,
        )
    }
    processor.use(builtInPlugins.remarkFrontmatterYaml.plugins?.after)

    processor.use(builtInPlugins.remarkGfm.plugins?.before)
    if (builtInPlugins.remarkGfm.enable) {
        processor.use(remarkGfm, builtInPlugins.remarkGfm.options)
    }
    processor.use(builtInPlugins.remarkGfm.plugins?.after)

    processor.use(builtInPlugins.remarkGithubAlerts.plugins?.before)
    if (builtInPlugins.remarkGithubAlerts.enable) {
        processor.use(
            remarkGithubAlerts,
            builtInPlugins.remarkGithubAlerts.options,
        )
    }
    processor.use(builtInPlugins.remarkGithubAlerts.plugins?.after)

    processor.use(builtInPlugins.remarkUnwrapImages.plugins?.before)
    if (builtInPlugins.remarkUnwrapImages.enable) {
        processor.use(remarkUnwrapImages)
    }
    processor.use(builtInPlugins.remarkUnwrapImages.plugins?.after)

    processor.use(builtInPlugins.remarkToc.plugins?.before)
    if (builtInPlugins.remarkToc.enable) {
        processor.use(remarkToc)
    }
    processor.use(builtInPlugins.remarkToc.plugins?.after)

    processor.use(builtInPlugins.remarkRehype.plugins?.before)
    processor.use(remarkRehype, {
        ...builtInPlugins.remarkRehype.options,
        allowDangerousHtml: true,
    })
    processor.use(builtInPlugins.remarkRehype.plugins?.after)

    processor.use(builtInPlugins.rehypeSlug.plugins?.before)
    if (builtInPlugins.rehypeSlug.enable) {
        processor.use(rehypeSlug, builtInPlugins.rehypeSlug.options)
    }
    processor.use(builtInPlugins.rehypeSlug.plugins?.after)

    processor.use(builtInPlugins.rehypeAutolinkHeadings.plugins?.before)
    if (builtInPlugins.rehypeAutolinkHeadings.enable) {
        processor.use(
            rehypeAutolinkHeadings,
            builtInPlugins.rehypeAutolinkHeadings.options,
        )
    }
    processor.use(builtInPlugins.rehypeAutolinkHeadings.plugins?.after)

    processor.use(builtInPlugins.rehypeShiki.plugins?.before)
    if (builtInPlugins.rehypeShiki.enable) {
        processor.use(rehypeShiki, {
            theme: "github-dark",
            ...builtInPlugins.rehypeShiki.options,
        })
    }
    processor.use(builtInPlugins.rehypeShiki.plugins?.after)

    processor.use(builtInPlugins.rehypeSanitizeCodeElement.plugins?.before)
    processor.use(rehypeSanitizeCodeElement)
    processor.use(builtInPlugins.rehypeSanitizeCodeElement.plugins?.after)

    processor.use(builtInPlugins.rehypeCustomMarkdownElements.plugins?.before)
    if (builtInPlugins.rehypeCustomMarkdownElements.enable) {
        processor.use(rehypeCustomMarkdownElements, mdxPreprocessOptions)
    }
    processor.use(builtInPlugins.rehypeCustomMarkdownElements.plugins?.after)

    processor.use(builtInPlugins.rehypeExternalLinks.plugins?.before)
    if (builtInPlugins.rehypeExternalLinks.enable) {
        processor.use(rehypeExternalLinks, {
            rel: (element) => {
                if (isHrefExternal(String(element.properties.href))) {
                    return ["nofollow", "noopener", "noreferrer"].join(" ")
                }
            },
            target: (element) => {
                if (isHrefExternal(String(element.properties.href))) {
                    return "_blank"
                }
            },
            ...builtInPlugins.rehypeExternalLinks.options,
        })
    }
    processor.use(builtInPlugins.rehypeExternalLinks.plugins?.after)

    processor.use(builtInPlugins.rehypeStringify.plugins?.before)
    processor.use(rehypeStringify, {
        ...builtInPlugins.rehypeStringify.options,
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
        allowParseErrors: true,
    })
    processor.use(builtInPlugins.rehypeStringify.plugins?.after)

    const result = await processor.process(markup.content)

    return {
        content: result.value.toString(),
        data: result.data,
    }
}) satisfies MdxPreprocessOptionsInput["onTransform"]
