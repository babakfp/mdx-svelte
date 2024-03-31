import * as v from "valibot"
import type { Preset } from "unified"

import type { Options as RemarkFrontmatterOptions } from "remark-frontmatter"
import type { Options as RemarkFrontmatterYamlOptions } from "remark-frontmatter-yaml"
import type { Options as RemarkGfmOptions } from "remark-gfm"
import type { Options as RemarkRehypeOptions } from "remark-rehype"
import type { Options as RehypeSlugOptions } from "rehype-slug"
import type { Options as RehypeAutolinkHeadingsOptions } from "rehype-autolink-headings"
import type { RehypeShikiOptions } from "@shikijs/rehype"
import type { Options as RehypeExternalLinksOptions } from "rehype-external-links"
import type { Options as RehypeStringifyOptions } from "rehype-stringify"

const CustomPluginsSchema = v.optional(
    v.object({
        before: v.optional(v.special<Preset>(() => true)),
        after: v.optional(v.special<Preset>(() => true)),
    })
)

export const ConfigSchema = v.optional(
    v.object({
        builtInPlugins: v.optional(
            v.object({
                /**
                 * [View on NPM](https://npmjs.com/package/remark-frontmatter).
                 */
                remarkFrontmatter: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                        // TODO: Add `"toml"`, `"json"`, `"jsonc"` and `"json5"` support.
                        /** Only `"yaml"` is supported for now. */
                        lang: v.optional(v.union([v.literal("yaml")]), "yaml"),
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/remark-frontmatter-yaml).
                 * If `remarkFrontmatter` is disabled, this plugin will be disabled too.
                 */
                remarkFrontmatterYaml: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/remark-gfm).
                 */
                remarkGfm: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/remark-unwrap-images).
                 */
                remarkUnwrapImages: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/remark-rehype).
                 * Can't be disabled.
                 */
                remarkRehype: v.optional(
                    v.object({
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * A custom plugin that enables customizing HTML elements with Svelte components.
                 * If `rehypeMarkdownElements` is disabled, this plugin will be disabled too.
                 */
                rehypeMarkdownElementsContext: v.optional(
                    v.object({
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/rehype-slug).
                 */
                rehypeSlug: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/rehype-autolink-headings).
                 */
                rehypeAutolinkHeadings: v.optional(
                    v.object({
                        /** @default false */
                        enable: v.optional(v.boolean(), false),
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/@shikijs/rehype).
                 */
                rehypeShiki: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * A custom plugin that sanitizes the some characters in code elements.
                 * Important: This plugin changes the `type` property of `text` nodes to `"raw"`.
                 * Can't be disabled.
                 */
                rehypeSanitizeCodeElement: v.optional(
                    v.object({
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * A custom plugin that enables customizing HTML elements with Svelte components.
                 */
                rehypeMarkdownElements: v.optional(
                    v.object({
                        /** @default false */
                        enable: v.optional(v.boolean(), false),
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/rehype-external-links).
                 * This function sets the `target` attribute to `"_blank"` and the `rel` attribute to `"nofollow noopener noreferrer"` for hyperlinks containing `"http://"` or `"https://"`.
                 */
                rehypeExternalLinks: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/rehype-stringify).
                 * Can't be disabled.
                 */
                rehypeStringify: v.optional(
                    v.object({
                        plugins: CustomPluginsSchema,
                    }),
                    {}
                ),
            }),
            {}
        ),
    }),
    {}
)

/**
 * A simplified version of the original option types of {@link RemarkFrontmatterOptions}.
 * Some options are omitted for simplicity and readability.
 */
type RemarkFrontmatterCustomOptions = {
    /**
     * @default
     * { open: "---", close: "---" }
     */
    fence?: {
        /** @default "---" */
        close: string
        /** @default "---" */
        open: string
    }
    /** @default false */
    anywhere?: boolean
}

/**
 * A modified version of the original option types of {@link RemarkRehypeOptions}.
 * Some options are omitted because they are required and should not be disabled.
 */
type OmittedRemarkRehypeOptions = Omit<
    RemarkRehypeOptions,
    "allowDangerousHtml"
>

/**
 * A modified version of the original option types of {@link RehypeStringifyOptions}.
 * Some options are omitted because they are required and should not be disabled.
 */
type OmittedRehypeStringifyOptions = Omit<
    RehypeStringifyOptions,
    "allowDangerousCharacters" | "allowDangerousHtml"
>

// TODO: [^1]
type BuiltInPluginsOptions = {
    builtInPlugins: {
        remarkFrontmatter: {
            options?: RemarkFrontmatterCustomOptions
        }
        remarkFrontmatterYaml: {
            options?: RemarkFrontmatterYamlOptions
        }
        remarkGfm: {
            options?: RemarkGfmOptions
        }
        remarkRehype: {
            options?: OmittedRemarkRehypeOptions
        }
        rehypeSlug: {
            options?: RehypeSlugOptions
        }
        rehypeAutolinkHeadings: {
            options?: RehypeAutolinkHeadingsOptions
        }
        rehypeShiki: {
            options?: RehypeShikiOptions
        }
        rehypeExternalLinks: {
            options?: RehypeExternalLinksOptions
        }
        rehypeStringify: {
            options?: OmittedRehypeStringifyOptions
        }
    }
}

// TODO: [^1]
export type ConfigInput = v.Input<typeof ConfigSchema> &
    Partial<BuiltInPluginsOptions>

// TODO: [^1]
export type ConfigOutput = v.Output<typeof ConfigSchema> & BuiltInPluginsOptions
