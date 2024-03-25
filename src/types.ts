import * as v from "valibot"
import type { MarkupPreprocessor } from "svelte/compiler"
import type { Data } from "vfile"
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

import { DEFAULT_EXTENSIONS } from "./constants.js"

/**
 * Unwraps named object types for improved readability.
 * {@link https://www.totaltypescript.com/concepts/the-prettify-helper The `Prettify` Helper}.
 */
type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

/**
 * Same as `Required`, it also makes the properties non-optional.
 * {@link https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype TypeScript `NonNullable` type}.
 */
export type RequiredNonNullable<T> = Prettify<{
    [K in keyof T]-?: NonNullable<T[K]>
}>

/**
 * Svelte markup preprocessor options.
 */
export type MarkupPreprocessorOptions = Parameters<MarkupPreprocessor>[0]

/**
 * Svelte in Markdown config callback options.
 */
export type ConfigCallbacks = {
    /**
     * Callback function to determine whether a file should be ignored during preprocessing.
     * It runs after `allowNodeModules` and `allowNodeModulesItems` options.
     * @param options - Contains file path and content.
     * @returns Return `true` to ignore the file, otherwise return `false`.
     */
    onFileIgnore?: (
        options: RequiredNonNullable<MarkupPreprocessorOptions>
    ) => boolean
}

const CustomPluginsSchema = v.optional(
    v.object({
        before: v.optional(v.special<Preset>(() => true)),
        after: v.optional(v.special<Preset>(() => true)),
    })
)

/**
 * Svelte in Markdown config options.
 */
export const ConfigSchema = v.optional(
    v.object({
        MarkdownElements: v.optional(v.array(v.string()), []),
        /** File extensions to be preprocessed. */
        extensions: v.optional(
            v.array(
                v.string([
                    v.minLength(1),
                    v.regex(
                        /^\.[a-z]+(\.[a-z]+)?$/,
                        `Invalid file extension! Valid examples: ${JSON.stringify(
                            DEFAULT_EXTENSIONS
                        )}.`
                    ),
                ]),
                [v.minLength(1)]
            ),
            DEFAULT_EXTENSIONS
        ),
        /** Should files in packages located in the `node_modules` folder be preprocessed? */
        allowNodeModules: v.optional(v.boolean(), false),
        /** Include the name of the installed packages you want to exclude from being preprocessed. */
        allowNodeModulesItems: v.optional(
            v.array(v.string([v.minLength(1)])),
            []
        ),
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
                 * A custom plugin that enables customizing HTML elements with Svelte components.
                 * Can't be disabled.
                 */
                rehypeCustomMarkdownElements: v.optional(
                    v.object({
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

// TODO: Maybe make it generic
// Record<"frontmatter", Record<string, unknown>> & Record<string, unknown>
export type MarkdownData = Data

/*
[^1]: TypeScript types with Valibot
- This is how to use TypeScript types with Valibot: https://github.com/fabian-hiller/valibot/discussions/477.
- Whenever https://github.com/microsoft/TypeScript/issues/42873 fixes, move the extra types from `ConfigInput` and `ConfigOutput` to the schema itself.
*/
