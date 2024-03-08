import type { PreprocessorGroup } from "svelte/compiler"

import type { Config } from "./types.js"
import { getExtension } from "./getExtension.js"
import { markupPreprocessor } from "./markupPreprocessor.js"

export const svelteInMarkdown = (config: Partial<Config> = {}) => {
    config.extension = getExtension(config.extension)
    config.allowNodeModules ??= false // TODO: Should be `true` instead?

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(config.extension),
    } satisfies PreprocessorGroup
}
