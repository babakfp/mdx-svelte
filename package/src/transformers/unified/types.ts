import type { RehypeShikiOptions } from "@shikijs/rehype"
import type * as hast from "hast"
import type * as mdast from "mdast"
import type { Options as RehypeAutolinkHeadingsOptions } from "rehype-autolink-headings"
import type { Options as RehypeExternalLinksOptions } from "rehype-external-links"
import type { Options as RehypeSlugOptions } from "rehype-slug"
import type { Options as RehypeStringifyOptions } from "rehype-stringify"
import type { Options as RemarkFrontmatterOptions } from "remark-frontmatter"
import type { Options as RemarkFrontmatterYamlOptions } from "remark-frontmatter-yaml"
import type { Options as RemarkGfmOptions } from "remark-gfm"
import type { Options as RemarkRehypeOptions } from "remark-rehype"
import type { Options as RemarkTocOptions } from "remark-toc"
import type { Plugin } from "unified"
import { Prettify, Spread } from "../../utils/types.js"
import type { Options as RemarkDirectiveOptions } from "./plugins/remark-directive.js"
import type { RemarkGitHubAlertsOptions } from "./plugins/remark-github-alerts/src/index.js"

export type UnifiedTransformerOptions = Prettify<
    {
        remarkPlugins?: RemarkPlugins
        rehypePlugins?: RehypePlugins
    } & Spread<Plugins<RemarkPlugins>, CoreRemarkPluginOptions> &
        Spread<Plugins<RehypePlugins>, CoreRehypePluginOptions>
>

type CoreRemarkPluginOptions = {
    /** [View on NPM](https://npmjs.com/package/remark-frontmatter). */
    remarkFrontmatter?: {
        /** @default "yaml" */
        options?: RemarkFrontmatterOptions
    }

    /** [View on NPM](https://npmjs.com/package/remark-frontmatter-yaml). */
    remarkFrontmatterYaml?: {
        /** @default true */
        enable?: boolean
        options?: RemarkFrontmatterYamlCustomOptions
    }

    /** [View on NPM](https://npmjs.com/package/remark-gfm). */
    remarkGfm?: {
        /** @default true */
        enable?: boolean
        options?: RemarkGfmOptions
    }

    /**
     * This plugin is a fork of ["remark-github-alerts"](https://npmjs.com/package/remark-github-alerts).
     * Refer to jsDoc comments for docs.
     */
    remarkGithubAlerts?: {
        /** @default true */
        enable?: boolean
        options?: RemarkGitHubAlertsOptions
    }

    /** [View on NPM](https://npmjs.com/package/remark-toc). */
    remarkToc?: {
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
    remarkDirective?: {
        /** @default true */
        enable?: boolean
        options?: RemarkDirectiveOptions
    }

    /** [View on NPM](https://npmjs.com/package/remark-breaks). */
    remarkBreaks?: {
        /** @default true */
        enable?: boolean
    }

    /** [View on NPM](https://npmjs.com/package/remark-rehype). */
    remarkRehype?: {
        options?: RemarkRehypeCustomOptions
    }
}

type CoreRehypePluginOptions = {
    /** [View on NPM](https://npmjs.com/package/rehype-unwrap-images). */
    rehypeUnwrapImages?: {
        /** @default true */
        enable?: boolean
    }

    /** [View on NPM](https://npmjs.com/package/rehype-slug). */
    rehypeSlug?: {
        /** @default true */
        enable?: boolean
        options?: RehypeSlugOptions
    }

    /** [View on NPM](https://npmjs.com/package/rehype-autolink-headings). */
    rehypeAutolinkHeadings?: {
        /** @default false */
        enable?: boolean
        options?: RehypeAutolinkHeadingsOptions
    }

    /** [View on NPM](https://npmjs.com/package/@shikijs/rehype). */
    rehypeShiki?: {
        /** @default true */
        enable?: boolean
        options?: RehypeShikiOptions
    }

    /**
     * A custom plugin that sanitizes the some characters in code elements.
     *
     * **Important**: This plugin changes the `type` property of `text` nodes to `"raw"`.
     *
     * This plugin can't be disabled.
     */
    rehypeSanitizeCodeElement?: Plugins<RehypePlugins>

    rehypePreCodeContentToString?: {
        /** @default true */
        enable?: boolean
    }

    /** A custom plugin that enables customizing HTML elements with Svelte components. */
    rehypeCustomMarkdownElements?: {
        /** @default true */
        enable?: boolean
    }

    /** [View on NPM](https://npmjs.com/package/rehype-external-links). */
    rehypeExternalLinks?: {
        /** @default true */
        enable?: boolean
        options?: RehypeExternalLinksOptions
    }

    /** [View on NPM](https://npmjs.com/package/rehype-stringify). */
    rehypeStringify?: {
        options?: RehypeStringifyCustomOptions
    }
}

type Plugins<Plugins extends RemarkPlugins | RehypePlugins> = {
    /** Useful to add a plugin before or after this plugin. It's cleaner to use `remarkPlugins` and `rehypePlugins` instead. */
    plugins?: {
        /** Useful to add a plugin before this plugin. It's cleaner to use `remarkPlugins` and `rehypePlugins` instead. */
        before?: Plugins
        /** Useful to add a plugin after this plugin. It's cleaner to use `remarkPlugins` and `rehypePlugins` instead. */
        after?: Plugins
    }
}

export type RemarkPlugin<PluginParameters extends any[] = any[]> = Plugin<
    PluginParameters,
    mdast.Root
>
export type RemarkPlugins = (RemarkPlugin | [RemarkPlugin, any])[]

export type RehypePlugin<PluginParameters extends any[] = any[]> = Plugin<
    PluginParameters,
    hast.Root
>
export type RehypePlugins = (RehypePlugin | [RehypePlugin, any])[]

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
