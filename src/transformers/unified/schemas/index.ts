import * as v from "valibot"

import { RemarkFrontmatterSchema } from "./RemarkFrontmatterSchema.js"
import { RemarkFrontmatterYamlSchema } from "./RemarkFrontmatterYamlSchema.js"
import { RemarkGfmSchema } from "./RemarkGfmSchema.js"
import { RemarkUnwrapImagesSchema } from "./RemarkUnwrapImagesSchema.js"
import { RemarkTocSchema } from "./RemarkTocSchema.js"
import { RemarkRehypeSchema } from "./RemarkRehypeSchema.js"
import { RehypeMarkdownElementsContextSchema } from "./RehypeMarkdownElementsContextSchema.js"
import { RehypeSlugSchema } from "./RehypeSlugSchema.js"
import { RehypeAutolinkHeadingsSchema } from "./RehypeAutolinkHeadingsSchema.js"
import { RehypeShikiSchema } from "./RehypeShikiSchema.js"
import { RehypeSanitizeCodeElementSchema } from "./RehypeSanitizeCodeElementSchema.js"
import { RehypeMarkdownElementsSchema } from "./RehypeMarkdownElementsSchema.js"
import { RehypeExternalLinksSchema } from "./RehypeExternalLinksSchema.js"
import { RehypeStringifySchema } from "./RehypeStringifySchema.js"

// TODO: https://github.com/microsoft/TypeScript/issues/42873
import * as _1 from "../../../../node_modules/.pnpm/yaml@2.4.1/node_modules/yaml/dist/index.js"
import * as _2 from "../../../../node_modules/remark-gfm/lib/index.js"
import * as _3 from "../../../../node_modules/.pnpm/mdast-util-toc@7.0.0/node_modules/mdast-util-toc/lib/index.js"
import * as _4 from "../../../../node_modules/rehype-slug/lib/index.js"
import * as _5 from "../../../../node_modules/rehype-autolink-headings/lib/index.js"
import * as _6 from "../../../../node_modules/rehype-external-links/lib/index.js"
import * as _7 from "../../../../node_modules/hast-util-to-html/lib/index.js"
import * as _8 from "../../../../node_modules/.pnpm/mdast-util-to-hast@13.1.0/node_modules/mdast-util-to-hast/index.js"

export const ConfigSchema = v.optional(
    v.object(
        {
            builtInPlugins: v.optional(
                v.object(
                    {
                        /** [View on NPM](https://npmjs.com/package/remark-frontmatter). */
                        remarkFrontmatter: RemarkFrontmatterSchema,

                        /**
                         * [View on NPM](https://npmjs.com/package/remark-frontmatter-yaml).
                         *
                         * If `remarkFrontmatter` is disabled, this plugin will be disabled too.
                         */
                        remarkFrontmatterYaml: RemarkFrontmatterYamlSchema,

                        /** [View on NPM](https://npmjs.com/package/remark-gfm). */
                        remarkGfm: RemarkGfmSchema,

                        /** [View on NPM](https://npmjs.com/package/remark-unwrap-images). */
                        remarkUnwrapImages: RemarkUnwrapImagesSchema,

                        /**
                         * [View on NPM](https://npmjs.com/package/remark-toc).
                         *
                         * If you are importing markdown files into other markdown files, Remark Toc won't be able to extract the headings of those components.
                         * In order to fix this issue, use need to select the headings on runtime, which there is a built-in plugin that you can use.
                         * Don't forget to disable this plugin first:
                         *
                         * ```ts
                         * {
                         *     remarkToc: {
                         *         enable: false,
                         *     },
                         * }
                         * ```
                         */
                        remarkToc: RemarkTocSchema,

                        /** [View on NPM](https://npmjs.com/package/remark-rehype). */
                        remarkRehype: RemarkRehypeSchema,

                        rehypeMarkdownElementsContext:
                            RehypeMarkdownElementsContextSchema,

                        /** [View on NPM](https://npmjs.com/package/rehype-slug). */
                        rehypeSlug: RehypeSlugSchema,

                        /**
                         * [View on NPM](https://npmjs.com/package/rehype-autolink-headings).
                         *
                         * ## Example usage
                         *
                         * ```ts
                         * {
                         *     rehypeAutolinkHeadings: {
                         *         enable: true,
                         *         options: {
                         *             behavior: "append",
                         *             properties: {
                         *                 class: "heading-permalink",
                         *                 "aria-label": "Permalink to this headline",
                         *             },
                         *             content() {
                         *                 // import { hastFromHtml } from "svelte-in-markdown/transformers/unified"
                         *                 return hastFromHtml(
                         *                     `<svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"/></svg>`,
                         *                 )
                         *             },
                         *             test: ["h2", "h3", "h4", "h5", "h6"],
                         *         },
                         *     },
                         * }
                         * ```
                         */
                        rehypeAutolinkHeadings: RehypeAutolinkHeadingsSchema,

                        /**
                         * [View on NPM](https://npmjs.com/package/@shikijs/rehype).
                         *
                         * ## Example usage
                         *
                         * ```ts
                         * {
                         *     rehypeShiki: {
                         *         options: {
                         *             theme: "rose-pine-moon",
                         *             langs: [
                         *                 "html",
                         *                 "css",
                         *                 "js",
                         *                 "svelte",
                         *                 "php",
                         *                 "bash",
                         *             ],
                         *         },
                         *     },
                         * }
                         * ```
                         */
                        rehypeShiki: RehypeShikiSchema,

                        /**
                         * A custom plugin that sanitizes the some characters in code elements.
                         *
                         * **Important**: This plugin changes the `type` property of `text` nodes to `"raw"`.
                         */
                        rehypeSanitizeCodeElement:
                            RehypeSanitizeCodeElementSchema,

                        /**
                         * A custom plugin that enables customizing HTML elements with Svelte components.
                         *
                         * Can be enabled by setting `'markdownElementsStrategy'` in `svelteInMarkdownPreprocess` to `"expensive"`.
                         */
                        rehypeMarkdownElements: RehypeMarkdownElementsSchema,

                        /**
                         * [View on NPM](https://npmjs.com/package/rehype-external-links).
                         *
                         * This function sets the `target` attribute to `"_blank"` and the `rel` attribute to `"nofollow noopener noreferrer"` for hyperlinks containing `"http://"` or `"https://"`.
                         */
                        rehypeExternalLinks: RehypeExternalLinksSchema,

                        /**
                         * [View on NPM](https://npmjs.com/package/rehype-stringify).
                         */
                        rehypeStringify: RehypeStringifySchema,
                    },
                    v.never()
                ),
                {}
            ),
        },
        v.never()
    ),
    {}
)
