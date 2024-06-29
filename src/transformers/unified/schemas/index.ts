import { z } from "zod"
import type { Preset } from "unified"
import type { Options as RemarkFrontmatterOptions } from "remark-frontmatter"
import type { Options as RemarkFrontmatterYamlOptions } from "remark-frontmatter-yaml"
import type { Options as RemarkGfmOptions } from "remark-gfm"
import type { RemarkGitHubAlertsOptions } from "../plugins/remark-github-alerts/src/index.js"
import type { Options as RemarkTocOptions } from "remark-toc"
import type { Options as RemarkRehypeOptions } from "remark-rehype"
import type { Options as RehypeSlugOptions } from "rehype-slug"
import type { Options as RehypeAutolinkHeadingsOptions } from "rehype-autolink-headings"
import type { RehypeShikiOptions } from "@shikijs/rehype"
import type { Options as RehypeExternalLinksOptions } from "rehype-external-links"
import type { Options as RehypeStringifyOptions } from "rehype-stringify"

const BaseSchema = z.object({
    /** Useful to add a plugin before or after this plugin. */
    plugins: z
        .object({
            /** Useful to add a plugin before this plugin. */
            before: z.custom<Preset>().optional(),

            /** Useful to add a plugin after this plugin. */
            after: z.custom<Preset>().optional(),
        })
        .optional(),
})

import * as _1 from "../../../../node_modules/.pnpm/mdast-util-toc@7.1.0/node_modules/mdast-util-toc/lib/index.js"
import * as _2 from "../../../../node_modules/rehype-autolink-headings/lib/index.js"
import * as _3 from "../../../../node_modules/rehype-external-links/lib/index.js"
import * as _4 from "../../../../node_modules/rehype-slug/lib/index.js"
import * as _5 from "../../../../node_modules/remark-gfm/lib/index.js"

export const ConfigSchema = z
    .object({
        builtInPlugins: z
            .object({
                /** [View on NPM](https://npmjs.com/package/remark-frontmatter). */
                remarkFrontmatter: z
                    .object({
                        /** @default true */
                        enable: z.boolean().default(true),
                        lang: z.literal("yaml").default("yaml"),
                        options: z
                            .custom<RemarkFrontmatterCustomOptions>()
                            .optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** [View on NPM](https://npmjs.com/package/remark-frontmatter-yaml). */
                remarkFrontmatterYaml: z
                    .object({
                        /** @default true */
                        enable: z.boolean().default(true),
                        options: z
                            .custom<RemarkFrontmatterYamlCustomOptions>()
                            .optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** [View on NPM](https://npmjs.com/package/remark-gfm). */
                remarkGfm: z
                    .object({
                        /** @default true */
                        enable: z.boolean().default(true),
                        options: z.custom<RemarkGfmOptions>().optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /**
                 * This plugin is a fork of ["remark-github-alerts"](https://npmjs.com/package/remark-github-alerts).
                 * Refer to jsDoc comments for documentations.
                 */
                remarkGithubAlerts: z
                    .object({
                        /** @default true */
                        enable: z.boolean().default(true),
                        options: z
                            .custom<RemarkGitHubAlertsOptions>()
                            .optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** [View on NPM](https://npmjs.com/package/remark-unwrap-images). */
                remarkUnwrapImages: z
                    .object({
                        /** @default true */
                        enable: z.boolean().default(true),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** [View on NPM](https://npmjs.com/package/remark-toc). */
                remarkToc: z
                    .object({
                        /** @default true */
                        enable: z.boolean().default(true),
                        options: z.custom<RemarkTocOptions>().optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** [View on NPM](https://npmjs.com/package/remark-rehype). */
                remarkRehype: z
                    .object({
                        /** @readonly This plugin can't be disabled. */
                        enable: z.literal(true).default(true),
                        options: z
                            .custom<RemarkRehypeCustomOptions>()
                            .optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),

                rehypeMarkdownElementsContext: z
                    .object({
                        /** @readonly This plugin can't be disabled. */
                        enable: z.literal(true).default(true),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** [View on NPM](https://npmjs.com/package/rehype-slug). */
                rehypeSlug: z
                    .object({
                        /** @default true */
                        enable: z.boolean().default(true),
                        options: z.custom<RehypeSlugOptions>().optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** [View on NPM](https://npmjs.com/package/rehype-autolink-headings). */
                rehypeAutolinkHeadings: z
                    .object({
                        /** @default false */
                        enable: z.boolean().default(false),
                        options: z
                            .custom<RehypeAutolinkHeadingsOptions>()
                            .optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** [View on NPM](https://npmjs.com/package/@shikijs/rehype). */
                rehypeShiki: z
                    .object({
                        /** @default true */
                        enable: z.boolean().default(true),
                        options: z.custom<RehypeShikiOptions>().optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /**
                 * A custom plugin that sanitizes the some characters in code elements.
                 *
                 * **Important**: This plugin changes the `type` property of `text` nodes to `"raw"`.
                 */
                rehypeSanitizeCodeElement: z
                    .object({
                        /** @readonly This plugin can't be disabled. */
                        enable: z.literal(true).default(true),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** A custom plugin that enables customizing HTML elements with Svelte components. */
                rehypeMarkdownElements: z
                    .object({
                        /** @default true */
                        enable: z.boolean().default(true),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** [View on NPM](https://npmjs.com/package/rehype-external-links). */
                rehypeExternalLinks: z
                    .object({
                        /** @default true */
                        enable: z.boolean().default(true),
                        options: z
                            .custom<RehypeExternalLinksOptions>()
                            .optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),

                /** [View on NPM](https://npmjs.com/package/rehype-stringify). */
                rehypeStringify: z
                    .object({
                        /** @readonly This plugin can't be disabled. */
                        enable: z.literal(true).default(true),
                        options: z
                            .custom<RehypeStringifyCustomOptions>()
                            .optional(),
                    })
                    .merge(BaseSchema)
                    .default({}),
            })
            .default({}),
    })
    .default({})

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
}

/**
 * A modified version of the original option types of {@link RemarkFrontmatterYamlOptions}.
 *
 * Some options (`"name"`) are omitted because they are required and should not modified!
 * Removed the `"name"` option for type-safety reasons.
 */
type RemarkFrontmatterYamlCustomOptions = Omit<
    NonNullable<RemarkFrontmatterYamlOptions>,
    "name"
>

/**
 * A modified version of the original option types of {@link Options}.
 *
 * Some options (`allowDangerousHtml`) are omitted because they are required and should not modified!
 */
type RemarkRehypeCustomOptions = Omit<RemarkRehypeOptions, "allowDangerousHtml">

/**
 * A modified version of the original option types of {@link RehypeStringifyOptions}.
 *
 * Some options (`allowDangerousCharacters`, `allowDangerousHtml`) are omitted because they are required and should not modified!
 */
type RehypeStringifyCustomOptions = Omit<
    RehypeStringifyOptions,
    "allowDangerousCharacters" | "allowDangerousHtml"
>
