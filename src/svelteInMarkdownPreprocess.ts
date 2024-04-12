import * as v from "valibot"
import type { PreprocessorGroup } from "svelte/compiler"

import { ConfigSchema } from "./schemas/index.js"
import type { ConfigInput } from "./types/index.js"
import { markupPreprocessor } from "./markupPreprocessor.js"

/**
 * This function acts as a preprocessor for Svelte.
 * It transforms Markdown files into HTML, preparing them for further processing by Svelte or other preprocessors.
 *
 * ## Getting started
 *
 * Add the following into the `svelte.config.js` file (in a SvelteKit project):
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
 * Add this into your layout file (`+layout.svelte`) to get the frontmatter data working:
 *
 * ```ts
 * <script lang="ts">
 *     import { setContext } from "svelte"
 *
 *     setContext("markdownElements_", markdownElements)
 *     //                          ^ IMPORTANT
 * </script>
 * ```
 */
export const svelteInMarkdownPreprocess = (config?: ConfigInput) => {
    const config_ = v.parse(ConfigSchema, config)

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(config_),
    } satisfies PreprocessorGroup
}
