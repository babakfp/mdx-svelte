import * as v from "valibot"
import type { PreprocessorGroup } from "svelte/compiler"

import { type ConfigInput, type ConfigOutput, ConfigSchema } from "./types.js"
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
 * import { svelteInMarkdown } from "svelte-in-markdown"
 *
 * const config = {
 *     preprocess: [
 *         vitePreprocess(),
 *         svelteInMarkdown(),
 *     ]
 * }
 * ```
 */
export const svelteInMarkdown = (config?: ConfigInput) => {
    // TODO: [^1]
    const config_: ConfigOutput = v.parse(ConfigSchema, config)

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(config_),
    } satisfies PreprocessorGroup
}
