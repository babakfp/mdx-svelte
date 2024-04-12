import * as v from "valibot"

import { ExtensionsSchema } from "./ExtensionsSchema.js"
import { MarkdownElementsStrategySchema } from "./MarkdownElementsStrategySchema.js"
import { LayoutsSchema } from "./LayoutsSchema.js"
import { AllowNodeModulesSchema } from "./AllowNodeModulesSchema.js"
import { AllowNodeModulesItemsSchema } from "./AllowNodeModulesItemsSchema.js"

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
             * import { svelteInMarkdownPreprocess, DEFAULT_EXTENSIONS } from "svelte-in-markdown"
             *
             * const config = {
             *     extensions: [".svelte", ...DEFAULT_EXTENSIONS],
             *     preprocess: [
             *         vitePreprocess(),
             *         svelteInMarkdownPreprocess(),
             *     ]
             * }
             * ```
             *
             * ## Custom value
             *
             * ```ts
             * import { svelteInMarkdownPreprocess } from "svelte-in-markdown"
             *
             * const config = {
             *     extensions: [".svelte", ".hello"],
             *     preprocess: [
             *         vitePreprocess(),
             *         svelteInMarkdownPreprocess({
             *             extensions: [".hello"]
             *         }),
             *     ]
             * }
             * ```
             *
             * @default
             * [".md", ".svelte.md"]
             */
            extensions: ExtensionsSchema,

            /**
             * This option is useful for replacing markdown elements with custom components.
             *
             * **Important**: It's recommended to avoid using `"expensive"`, because it can 10x the bundle size.
             *
             * When using `"expensive"`, you don't need to deal with the `layouts` property in this config and in the frontmatter of markdown files.
             *
             * @default "cheap"
             */
            markdownElementsStrategy: MarkdownElementsStrategySchema,

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
             *         svelteInMarkdownPreprocess({
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
             *     //                          ^ IMPORTANT
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
            layouts: LayoutsSchema,

            /**
             * **Important**: Not implemented yet!
             * Should files in packages located in the `node_modules` folder be preprocessed?
             */
            allowNodeModules: AllowNodeModulesSchema,

            /**
             * **Important**: Not implemented yet!
             * Include the name of the installed packages you want to exclude from being preprocessed.
             */
            allowNodeModulesItems: AllowNodeModulesItemsSchema,
        },
        v.unknown()
    ),
    {}
)
