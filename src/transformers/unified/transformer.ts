import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkDirective from "remark-directive"
import remarkFrontmatter from "remark-frontmatter"
import remarkFrontmatterYaml from "remark-frontmatter-yaml"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import rehypeUnwrapImages from "rehype-unwrap-images"
import type { MarkupPreprocessor } from "svelte/compiler"
import { unified } from "unified"
import { removePosition } from "unist-util-remove-position"
import { replaceInBlocks } from "../../helpers/transformLogicBlocks.js"
import { replaceInElements } from "../../helpers/transformSpecialElements.js"
import type {
    MdxPreprocessOptionsInput,
    MdxPreprocessOptionsOutput,
} from "../../mdxPreprocess/types.js"
import { isHrefExternal } from "./helpers/isHrefExternal.js"
import rehypeCustomMarkdownElements from "./plugins/rehype-custom-markdown-elements.js"
import rehypePreCodeContentToString from "./plugins/rehype-pre-code-content-to-string.js"
import rehypeSanitizeCodeElement from "./plugins/rehype-sanitize-code-element.js"
import remarkDirectiveCustom from "./plugins/remark-directive.js"
import remarkGithubAlerts from "./plugins/remark-github-alerts/src/index.js"
import remarkHtmlAttributeCurlyBracket from "./plugins/remark-html-attribute-curly-bracket.js"
import remarkLogicBlocks from "./plugins/remark-logic-blocks.js"
import remarkMdxDataAndCustomElements from "./plugins/remark-mdx-data-and-custom-elements.js"
import remarkSvelteSpecialElements from "./plugins/remark-svelte-special-elements.js"
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

    processor.use(() => (tree) => removePosition(tree, { force: true }))

    processor.use(remarkParse)

    // NOTE: This should always be before syntax highlighting.
    processor.use(remarkSvelteSpecialElements)

    processor.use(remarkMdxDataAndCustomElements, mdxPreprocessOptions)

    processor.use(remarkHtmlAttributeCurlyBracket)

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

    processor.use(builtInPlugins.rehypeUnwrapImages.plugins?.before)
    if (builtInPlugins.rehypeUnwrapImages.enable) {
        processor.use(rehypeUnwrapImages)
    }
    processor.use(builtInPlugins.rehypeUnwrapImages.plugins?.after)

    processor.use(builtInPlugins.remarkToc.plugins?.before)
    if (builtInPlugins.remarkToc.enable) {
        processor.use(remarkToc)
    }
    processor.use(builtInPlugins.remarkToc.plugins?.after)

    processor.use(builtInPlugins.remarkDirective.plugins?.before)
    if (builtInPlugins.remarkDirective.enable) {
        processor.use(remarkDirective)
        processor.use(
            remarkDirectiveCustom,
            builtInPlugins.remarkDirective.options,
        )
    }
    processor.use(builtInPlugins.remarkDirective.plugins?.after)

    // NOTE: This should always be after Directive syntax.
    processor.use(remarkLogicBlocks)

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

    processor.use(builtInPlugins.rehypePrettyCode.plugins?.before)
    if (builtInPlugins.rehypePrettyCode.enable) {
        processor.use(rehypePrettyCode, builtInPlugins.rehypePrettyCode.options)
    }
    processor.use(builtInPlugins.rehypePrettyCode.plugins?.after)

    processor.use(builtInPlugins.rehypeSanitizeCodeElement.plugins?.before)
    processor.use(rehypeSanitizeCodeElement)
    processor.use(builtInPlugins.rehypeSanitizeCodeElement.plugins?.after)

    processor.use(builtInPlugins.rehypePreCodeContentToString.plugins?.before)
    if (builtInPlugins.rehypePreCodeContentToString.enable) {
        processor.use(rehypePreCodeContentToString)
    }
    processor.use(builtInPlugins.rehypePreCodeContentToString.plugins?.after)

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

    markup.content = replaceInElements(markup.content)
    markup.content = replaceInBlocks(markup.content)

    const result = await processor.process(markup.content)

    return {
        content: result.value.toString(),
        data: result.data,
    }
}) satisfies MdxPreprocessOptionsInput["onTransform"]
