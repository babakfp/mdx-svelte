import type { PreprocessorGroup } from "svelte/compiler"

import type { Config } from "./types.js"
import { getExtensions } from "./getExtensions.js"
import { markupPreprocessor } from "./markupPreprocessor.js"

export const svelteInMarkdown = (config: Partial<Config> = {}) => {
    config.extensions = getExtensions(config.extensions)
    config.allowNodeModules ??= false // TODO: Should be `true` instead?

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(config.extensions),
    } satisfies PreprocessorGroup
}
