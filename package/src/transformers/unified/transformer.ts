import { transformerColorizedBrackets } from "@shikijs/colorized-brackets"
import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import rehypeUnwrapImages from "rehype-unwrap-images"
import remarkBreaks from "remark-breaks"
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

    processor.use(transformerOptions?.remarkFrontmatter?.plugins?.before ?? [])
    processor.use(
        remarkFrontmatter,
        transformerOptions?.remarkFrontmatter?.options || "yaml",
    )
    processor.use(transformerOptions?.remarkFrontmatter?.plugins?.after ?? [])

    processor.use(
        transformerOptions?.remarkFrontmatterYaml?.plugins?.before ?? [],
    )
    if (transformerOptions?.remarkFrontmatterYaml?.enable ?? true) {
        processor.use(
            remarkFrontmatterYaml,
            transformerOptions?.remarkFrontmatterYaml?.options,
        )
    }
    processor.use(
        transformerOptions?.remarkFrontmatterYaml?.plugins?.after ?? [],
    )

    processor.use(transformerOptions?.remarkGfm?.plugins?.before ?? [])
    if (transformerOptions?.remarkGfm?.enable ?? true) {
        processor.use(remarkGfm, transformerOptions?.remarkGfm?.options)
    }
    processor.use(transformerOptions?.remarkGfm?.plugins?.after ?? [])

    processor.use(transformerOptions?.remarkGithubAlerts?.plugins?.before ?? [])
    if (transformerOptions?.remarkGithubAlerts?.enable ?? true) {
        processor.use(
            remarkGithubAlerts,
            transformerOptions?.remarkGithubAlerts?.options,
        )
    }
    processor.use(transformerOptions?.remarkGithubAlerts?.plugins?.after ?? [])

    processor.use(transformerOptions?.remarkToc?.plugins?.before ?? [])
    if (transformerOptions?.remarkToc?.enable ?? true) {
        processor.use(remarkToc)
    }
    processor.use(transformerOptions?.remarkToc?.plugins?.after ?? [])

    processor.use(transformerOptions?.remarkDirective?.plugins?.before ?? [])
    if (transformerOptions?.remarkDirective?.enable ?? true) {
        processor.use(remarkDirective)
        processor.use(
            remarkDirectiveCustom,
            transformerOptions?.remarkDirective?.options,
        )
    }
    processor.use(transformerOptions?.remarkDirective?.plugins?.after ?? [])

    // NOTE: This should always be after Directive syntax.
    processor.use(remarkLogicBlocks)

    processor.use(transformerOptions?.remarkBreaks?.plugins?.before ?? [])
    if (transformerOptions?.remarkBreaks?.enable ?? true) {
        processor.use(remarkBreaks)
    }
    processor.use(transformerOptions?.remarkBreaks?.plugins?.after ?? [])

    processor.use(transformerOptions?.remarkPlugins ?? [])

    processor.use(transformerOptions?.remarkRehype?.plugins?.before ?? [])
    processor.use(remarkRehype, {
        ...transformerOptions?.remarkRehype?.options,
        // NOTE: Turns `type: "html"` to `type: "raw"`.
        allowDangerousHtml: true,
    })
    processor.use(transformerOptions?.remarkRehype?.plugins?.after ?? [])

    processor.use(transformerOptions?.rehypeUnwrapImages?.plugins?.before ?? [])
    if (transformerOptions?.rehypeUnwrapImages?.enable ?? true) {
        processor.use(rehypeUnwrapImages)
    }
    processor.use(transformerOptions?.rehypeUnwrapImages?.plugins?.after ?? [])

    processor.use(transformerOptions?.rehypeSlug?.plugins?.before ?? [])
    if (transformerOptions?.rehypeSlug?.enable ?? true) {
        processor.use(rehypeSlug, transformerOptions?.rehypeSlug?.options)
    }
    processor.use(transformerOptions?.rehypeSlug?.plugins?.after ?? [])

    processor.use(
        transformerOptions?.rehypeAutolinkHeadings?.plugins?.before ?? [],
    )
    if (transformerOptions?.rehypeAutolinkHeadings?.enable) {
        processor.use(
            rehypeAutolinkHeadings,
            transformerOptions?.rehypeAutolinkHeadings?.options,
        )
    }
    processor.use(
        transformerOptions?.rehypeAutolinkHeadings?.plugins?.after ?? [],
    )

    processor.use(transformerOptions?.rehypeShiki?.plugins?.before ?? [])
    if (transformerOptions?.rehypeShiki?.enable ?? true) {
        const transformers: RehypeShikiOptions["transformers"] = [
            {
                name: "trim-end",
                preprocess: (code) => code.trimEnd(),
            },
            transformerColorizedBrackets(),
        ]

        if (transformerOptions?.rehypeShiki?.options?.transformers) {
            transformers.push(
                ...transformerOptions.rehypeShiki.options.transformers,
            )
        }

        processor.use(rehypeShiki, {
            theme: "github-dark",
            ...transformerOptions?.rehypeShiki?.options,
            transformers,
        })
    }
    processor.use(transformerOptions?.rehypeShiki?.plugins?.after ?? [])

    processor.use(
        transformerOptions?.rehypeSanitizeCodeElement?.plugins?.before ?? [],
    )
    processor.use(rehypeSanitizeCodeElement)
    processor.use(
        transformerOptions?.rehypeSanitizeCodeElement?.plugins?.after ?? [],
    )

    processor.use(
        transformerOptions?.rehypePreCodeContentToString?.plugins?.before ?? [],
    )
    if (transformerOptions?.rehypePreCodeContentToString?.enable ?? true) {
        processor.use(rehypePreCodeContentToString)
    }
    processor.use(
        transformerOptions?.rehypePreCodeContentToString?.plugins?.after ?? [],
    )

    processor.use(
        transformerOptions?.rehypeCustomMarkdownElements?.plugins?.before ?? [],
    )
    if (transformerOptions?.rehypeCustomMarkdownElements?.enable ?? true) {
        processor.use(rehypeCustomMarkdownElements, mdxPreprocessOptions)
    }
    processor.use(
        transformerOptions?.rehypeCustomMarkdownElements?.plugins?.after ?? [],
    )

    processor.use(
        transformerOptions?.rehypeExternalLinks?.plugins?.before ?? [],
    )
    if (transformerOptions?.rehypeExternalLinks?.enable ?? true) {
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
            ...transformerOptions?.rehypeExternalLinks?.options,
        })
    }
    processor.use(transformerOptions?.rehypeExternalLinks?.plugins?.after ?? [])

    processor.use(transformerOptions?.rehypePlugins ?? [])

    processor.use(transformerOptions?.rehypeStringify?.plugins?.before ?? [])
    processor.use(rehypeStringify, {
        ...transformerOptions?.rehypeStringify?.options,
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
        allowParseErrors: true,
    })
    processor.use(transformerOptions?.rehypeStringify?.plugins?.after ?? [])

    markup.content = replaceInElements(markup.content)
    markup.content = replaceInBlocks(markup.content)

    const result = await processor.process(markup.content)

    return {
        content: result.value.toString(),
        data: result.data,
    }
}) satisfies MdxPreprocessOptionsInput["onTransform"]
