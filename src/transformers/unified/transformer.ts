import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import rehypeUnwrapImages from "rehype-unwrap-images"
import remarkDirective from "remark-directive"
import remarkFrontmatter from "remark-frontmatter"
import remarkFrontmatterYaml from "remark-frontmatter-yaml"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
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
import type { UnifiedTransformerOptions } from "./types.js"

/**
 * A transformer that uses unified ecosystem.
 */
export const unifiedTransformer = (async (
    markup: Parameters<MarkupPreprocessor>[0],
    mdxPreprocessOptions: MdxPreprocessOptionsOutput,
    transformerOptions?: UnifiedTransformerOptions,
) => {
    const processor = unified()

    processor.use(() => (tree) => removePosition(tree, { force: true }))

    processor.use(remarkParse)

    // NOTE: This should always be before syntax highlighting.
    processor.use(remarkSvelteSpecialElements)

    processor.use(remarkMdxDataAndCustomElements, mdxPreprocessOptions)

    processor.use(remarkHtmlAttributeCurlyBracket)

    processor.use(remarkUnwrapHtml)

    processor.use(remarkTextToHtml)

    processor.use(
        transformerOptions?.builtInPlugins?.remarkFrontmatter?.plugins?.before,
    )
    processor.use(
        remarkFrontmatter,
        transformerOptions?.builtInPlugins?.remarkFrontmatter?.options ||
            "yaml",
    )
    processor.use(
        transformerOptions?.builtInPlugins?.remarkFrontmatter?.plugins?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.remarkFrontmatterYaml?.plugins
            ?.before,
    )
    if (
        transformerOptions?.builtInPlugins?.remarkFrontmatterYaml?.enable ??
        true
    ) {
        processor.use(
            remarkFrontmatterYaml,
            transformerOptions?.builtInPlugins?.remarkFrontmatterYaml?.options,
        )
    }
    processor.use(
        transformerOptions?.builtInPlugins?.remarkFrontmatterYaml?.plugins
            ?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.remarkGfm?.plugins?.before,
    )
    if (transformerOptions?.builtInPlugins?.remarkGfm?.enable ?? true) {
        processor.use(
            remarkGfm,
            transformerOptions?.builtInPlugins?.remarkGfm?.options,
        )
    }
    processor.use(transformerOptions?.builtInPlugins?.remarkGfm?.plugins?.after)

    processor.use(
        transformerOptions?.builtInPlugins?.remarkGithubAlerts?.plugins?.before,
    )
    if (
        transformerOptions?.builtInPlugins?.remarkGithubAlerts?.enable ??
        true
    ) {
        processor.use(
            remarkGithubAlerts,
            transformerOptions?.builtInPlugins?.remarkGithubAlerts?.options,
        )
    }
    processor.use(
        transformerOptions?.builtInPlugins?.remarkGithubAlerts?.plugins?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.remarkToc?.plugins?.before,
    )
    if (transformerOptions?.builtInPlugins?.remarkToc?.enable ?? true) {
        processor.use(remarkToc)
    }
    processor.use(transformerOptions?.builtInPlugins?.remarkToc?.plugins?.after)

    processor.use(
        transformerOptions?.builtInPlugins?.remarkDirective?.plugins?.before,
    )
    if (transformerOptions?.builtInPlugins?.remarkDirective?.enable ?? true) {
        processor.use(remarkDirective)
        processor.use(
            remarkDirectiveCustom,
            transformerOptions?.builtInPlugins?.remarkDirective?.options,
        )
    }
    processor.use(
        transformerOptions?.builtInPlugins?.remarkDirective?.plugins?.after,
    )

    // NOTE: This should always be after Directive syntax.
    processor.use(remarkLogicBlocks)

    processor.use(
        transformerOptions?.builtInPlugins?.remarkRehype?.plugins?.before,
    )
    processor.use(remarkRehype, {
        ...transformerOptions?.builtInPlugins?.remarkRehype?.options,
        // NOTE: Turns `type: "html"` to `type: "raw"`.
        allowDangerousHtml: true,
    })
    processor.use(
        transformerOptions?.builtInPlugins?.remarkRehype?.plugins?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.rehypeUnwrapImages?.plugins?.before,
    )
    if (
        transformerOptions?.builtInPlugins?.rehypeUnwrapImages?.enable ??
        true
    ) {
        processor.use(rehypeUnwrapImages)
    }
    processor.use(
        transformerOptions?.builtInPlugins?.rehypeUnwrapImages?.plugins?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.rehypeSlug?.plugins?.before,
    )
    if (transformerOptions?.builtInPlugins?.rehypeSlug?.enable ?? true) {
        processor.use(
            rehypeSlug,
            transformerOptions?.builtInPlugins?.rehypeSlug?.options,
        )
    }
    processor.use(
        transformerOptions?.builtInPlugins?.rehypeSlug?.plugins?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.rehypeAutolinkHeadings?.plugins
            ?.before,
    )
    if (transformerOptions?.builtInPlugins?.rehypeAutolinkHeadings?.enable) {
        processor.use(
            rehypeAutolinkHeadings,
            transformerOptions?.builtInPlugins?.rehypeAutolinkHeadings?.options,
        )
    }
    processor.use(
        transformerOptions?.builtInPlugins?.rehypeAutolinkHeadings?.plugins
            ?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.rehypePrettyCode?.plugins?.before,
    )
    if (transformerOptions?.builtInPlugins?.rehypePrettyCode?.enable ?? true) {
        processor.use(
            rehypePrettyCode,
            transformerOptions?.builtInPlugins?.rehypePrettyCode?.options,
        )
    }
    processor.use(
        transformerOptions?.builtInPlugins?.rehypePrettyCode?.plugins?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.rehypeSanitizeCodeElement?.plugins
            ?.before,
    )
    processor.use(rehypeSanitizeCodeElement)
    processor.use(
        transformerOptions?.builtInPlugins?.rehypeSanitizeCodeElement?.plugins
            ?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.rehypePreCodeContentToString
            ?.plugins?.before,
    )
    if (
        transformerOptions?.builtInPlugins?.rehypePreCodeContentToString
            ?.enable ??
        true
    ) {
        processor.use(rehypePreCodeContentToString)
    }
    processor.use(
        transformerOptions?.builtInPlugins?.rehypePreCodeContentToString
            ?.plugins?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.rehypeCustomMarkdownElements
            ?.plugins?.before,
    )
    if (
        transformerOptions?.builtInPlugins?.rehypeCustomMarkdownElements
            ?.enable ??
        true
    ) {
        processor.use(rehypeCustomMarkdownElements, mdxPreprocessOptions)
    }
    processor.use(
        transformerOptions?.builtInPlugins?.rehypeCustomMarkdownElements
            ?.plugins?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.rehypeExternalLinks?.plugins
            ?.before,
    )
    if (
        transformerOptions?.builtInPlugins?.rehypeExternalLinks?.enable ??
        true
    ) {
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
            ...transformerOptions?.builtInPlugins?.rehypeExternalLinks?.options,
        })
    }
    processor.use(
        transformerOptions?.builtInPlugins?.rehypeExternalLinks?.plugins?.after,
    )

    processor.use(
        transformerOptions?.builtInPlugins?.rehypeStringify?.plugins?.before,
    )
    processor.use(rehypeStringify, {
        ...transformerOptions?.builtInPlugins?.rehypeStringify?.options,
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
        allowParseErrors: true,
    })
    processor.use(
        transformerOptions?.builtInPlugins?.rehypeStringify?.plugins?.after,
    )

    markup.content = replaceInElements(markup.content)
    markup.content = replaceInBlocks(markup.content)

    const result = await processor.process(markup.content)

    return {
        content: result.value.toString(),
        data: result.data,
    }
}) satisfies MdxPreprocessOptionsInput["onTransform"]
