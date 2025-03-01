import type { RehypeShikiOptions } from "@shikijs/rehype"
import type { Options as RehypeAutolinkHeadingsOptions } from "rehype-autolink-headings"
import type { Options as RehypeExternalLinksOptions } from "rehype-external-links"
import type { Options as RehypeSlugOptions } from "rehype-slug"
import type { Options as RehypeStringifyOptions } from "rehype-stringify"
import type { Options as RemarkFrontmatterOptions } from "remark-frontmatter"
import type { Options as RemarkFrontmatterYamlOptions } from "remark-frontmatter-yaml"
import type { Options as RemarkGfmOptions } from "remark-gfm"
import type { Options as RemarkRehypeOptions } from "remark-rehype"
import type { Options as RemarkTocOptions } from "remark-toc"
import type { Preset } from "unified"
import type { Options as RemarkDirectiveOptions } from "./plugins/remark-directive.js"
import type { RemarkGitHubAlertsOptions } from "./plugins/remark-github-alerts/src/index.js"

export type UnifiedTransformerOptions = {
    builtInPlugins?: {
        /** [View on NPM](https://npmjs.com/package/remark-frontmatter). */
        remarkFrontmatter?: BaseSchema & {
            /** @default "yaml" */
            options?: RemarkFrontmatterOptions
        }

        /** [View on NPM](https://npmjs.com/package/remark-frontmatter-yaml). */
        remarkFrontmatterYaml?: BaseSchema & {
            /** @default true */
            enable?: boolean
            options?: RemarkFrontmatterYamlCustomOptions
        }

        /** [View on NPM](https://npmjs.com/package/remark-gfm). */
        remarkGfm?: BaseSchema & {
            /** @default true */
            enable?: boolean
            options?: RemarkGfmOptions
        }

        /**
         * This plugin is a fork of ["remark-github-alerts"](https://npmjs.com/package/remark-github-alerts).
         * Refer to jsDoc comments for documentations.
         */
        remarkGithubAlerts?: BaseSchema & {
            /** @default true */
            enable?: boolean
            options?: RemarkGitHubAlertsOptions
        }

        /** [View on NPM](https://npmjs.com/package/remark-toc). */
        remarkToc?: BaseSchema & {
            /** @default true */
            enable?: boolean
            options?: RemarkTocOptions
        }

        /**
         * [View on NPM](https://npmjs.com/package/remark-directive).
         * ### Supported directives
         * - `info`
         * - `warning`
         * - `danger`
         * - `success`
         * - `tip`
         * - `details`
         * ### Examples
         * ```md
         * :::info
         * Hello, World!
         * :::
         *
         * :::info[Information]
         * Hello, World!
         * :::
         *
         * :::info{.custom-class}
         * Hello, World!
         * :::
         * ```
         */
        remarkDirective?: BaseSchema & {
            /** @default true */
            enable?: boolean
            options?: RemarkDirectiveOptions
        }

        /** [View on NPM](https://npmjs.com/package/remark-rehype). */
        remarkRehype?: BaseSchema & {
            options?: RemarkRehypeCustomOptions
        }

        /** [View on NPM](https://npmjs.com/package/rehype-unwrap-images). */
        rehypeUnwrapImages?: BaseSchema & {
            /** @default true */
            enable?: boolean
        }

        /** [View on NPM](https://npmjs.com/package/rehype-slug). */
        rehypeSlug?: BaseSchema & {
            /** @default true */
            enable?: boolean
            options?: RehypeSlugOptions
        }

        /** [View on NPM](https://npmjs.com/package/rehype-autolink-headings). */
        rehypeAutolinkHeadings?: BaseSchema & {
            /** @default false */
            enable?: boolean
            options?: RehypeAutolinkHeadingsOptions
        }

        /** [View on NPM](https://npmjs.com/package/@shikijs/rehype). */
        rehypeShiki?: BaseSchema & {
            /** @default true */
            enable?: boolean
            options?: RehypeShikiOptions
        }

        rehypePreCodeContentToString?: BaseSchema & {
            /** @default true */
            enable?: boolean
        }

        /**
         * A custom plugin that sanitizes the some characters in code elements.
         *
         * **Important**: This plugin changes the `type` property of `text` nodes to `"raw"`.
         *
         * This plugin can't be disabled.
         */
        rehypeSanitizeCodeElement?: BaseSchema

        /** A custom plugin that enables customizing HTML elements with Svelte components. */
        rehypeCustomMarkdownElements?: BaseSchema & {
            /** @default true */
            enable?: boolean
        }

        /** [View on NPM](https://npmjs.com/package/rehype-external-links). */
        rehypeExternalLinks?: BaseSchema & {
            /** @default true */
            enable?: boolean
            options?: RehypeExternalLinksOptions
        }

        /** [View on NPM](https://npmjs.com/package/rehype-stringify). */
        rehypeStringify?: BaseSchema & {
            options?: RehypeStringifyCustomOptions
        }
    }
}

type BaseSchema = {
    /** Useful to add a plugin before or after this plugin. */
    plugins?: {
        /** Useful to add a plugin before this plugin. */
        before?: Preset
        /** Useful to add a plugin after this plugin. */
        after?: Preset
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
