import * as v from "valibot"
import type { MarkupPreprocessor } from "svelte/compiler"
import type { Data } from "vfile"

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

/** Svelte markup preprocessor options. */
export type MarkupPreprocessorOptions = Parameters<MarkupPreprocessor>[0]

/** Svelte in Markdown config callback options. */
type ConfigCallbacks = {
    /**
     * Callback function to determine whether a file should be ignored during preprocessing.
     * It runs after `allowNodeModules` and `allowNodeModulesItems` options.
     * @param options - Contains file path and content.
     * @returns Return `true` to ignore the file, otherwise return `false`.
     */
    onFileIgnore?: (
        options: RequiredNonNullable<MarkupPreprocessorOptions>
    ) => boolean

    /**
     * Use this to build your own transformer or customize the built-in plugins.
     * You will receive every markdown file and'll get to transform it.
     *
     * ## Example usage
     *
     * ```ts
     * {
     *     onTransform: async (options, config) => {
     *         // import { transformer } from "svelte-in-markdown/transformers/unified"
     *         return await transformer(options, config, {
     *             builtInPlugins: {
     *                 remarkToc: {
     *                     enable: false,
     *                 },
     *             },
     *         })
     *     },
     * }
     * ```
     */
    onTransform?: (
        /** Info about the markdown file that is going to be preprocessed. */
        markupPreprocessorOptions: RequiredNonNullable<MarkupPreprocessorOptions>,
        /** The config that is passed to `svelteInMarkdown()` by you, which also contains the default values for options. */
        config: ConfigOutput
    ) => Promise<{
        /** Transformed content. */
        content: string
        /** Data to be accessible when getting the markdown files via `import.meta.glob` and in the layout file via context. */
        data: MarkdownData
    }>
}

/** Svelte in Markdown config options. */
export const ConfigSchema = v.optional(
    v.object(
        {
            /**
             * File extensions to be preprocessed.
             * Only include the markdown files, not the `.svelte` files or any other.
             *
             * **Important**: Whatever value you choose here must be passed to the `extensions` config property of SvelteKit too.
             *
             * ## Default value
             *
             * ```ts
             * import { svelteInMarkdown, DEFAULT_EXTENSIONS } from "svelte-in-markdown"
             *
             * const config = {
             *     extensions: [".svelte", ...DEFAULT_EXTENSIONS],
             *     preprocess: [
             *         vitePreprocess(),
             *         svelteInMarkdown(),
             *     ]
             * }
             * ```
             *
             * ## Custom value
             *
             * ```ts
             * import { svelteInMarkdown } from "svelte-in-markdown"
             *
             * const config = {
             *     extensions: [".svelte", ".hello"],
             *     preprocess: [
             *         vitePreprocess(),
             *         svelteInMarkdown({
             *             extensions: [".hello"]
             *         }),
             *     ]
             * }
             * ```
             *
             * @default
             * [".md", ".svelte.md"]
             */
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

            /**
             * This option is useful for replacing markdown elements with custom components.
             *
             * **Important**: It's recommended to avoid using `"expensive"`, because it can 10x the bundle size.
             *
             * When using `"expensive"`, you don't need to deal with the `layouts` property in this config and in the frontmatter of markdown files.
             *
             * @default "cheap"
             */
            markdownElementsStrategy: v.optional(
                v.union([v.literal("cheap"), v.literal("expensive")]),
                "cheap"
            ),

            /**
             * This option is useful for replacing markdown elements with custom components.
             *
             * This option is only useful when `markdownElementsStrategy` is set to `"cheap"` (which is the default value).
             *
             * ## Default layout
             *
             * Example `svelte.config.js` file:
             *
             * ```ts
             * const config = {
             *     preprocess: [
             *         vitePreprocess(),
             *         svelteInMarkdown({
             *             layouts: {
             *                 default: ["img", "blockquote"],
             *             },
             *         }),
             *     ]
             * }
             * ```
             *
             * The `default` key is useful for applying custom components to all markdown files without needing to modify the frontmatter (unlike named layouts).
             *
             * Example layout file:
             *
             * You can use a native SvelteKit layout file like `+layout.svelte`.
             *
             * ```svelte
             * <script lang="ts" context="module">
             *     import img from "$lib/markdown/img.svelte"
             *     import blockquote from "$lib/markdown/blockquote.svelte"
             *
             *     export const markdownElements = { img, blockquote }
             * </script>
             *
             * <script lang="ts">
             *     import { setContext } from "svelte"
             *
             *     setContext("markdownElements_", markdownElements)
             * //                              ^ (important)
             * </script>
             *
             * <slot />
             * ```
             *
             * A `getContext` will be injected to all of the markdown files to receive the value of `markdownElements`.
             *
             * ## Custom layouts
             *
             * You can use different components for different collections like blog, documentation, etc.
             * As an example, let's create a layout named `blog`:
             *
             * ```ts
             * {
             *     layouts: {
             *         blog: ["img", "blockquote"],
             *     },
             * }
             * ```
             *
             * Add the following property into the frontmatter of a markdown file of a blog collection:
             *
             * ```md
             * ---
             * layout: blog
             * ---
             * ```
             */
            layouts: v.optional(
                v.record(v.array(v.string([v.regex(/[a-z]/)])))
            ),

            /**
             * **Important**: Not implemented yet!
             * Should files in packages located in the `node_modules` folder be preprocessed?
             */
            allowNodeModules: v.optional(v.boolean(), false),

            /**
             * **Important**: Not implemented yet!
             * Include the name of the installed packages you want to exclude from being preprocessed.
             */
            allowNodeModulesItems: v.optional(
                v.array(v.string([v.minLength(1)])),
                []
            ),
        },
        v.unknown()
    ),
    {}
)

export type ConfigInput = v.Input<typeof ConfigSchema> & ConfigCallbacks
export type ConfigOutput = v.Output<typeof ConfigSchema> & ConfigCallbacks

export type MarkdownData = Data

declare module "vfile" {
    interface DataMap {
        frontmatter?: {
            layout?: string
        } & Record<string, unknown>
    }
}
