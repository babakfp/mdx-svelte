import type { PreprocessorGroup } from "svelte/compiler"

import type { Config } from "./types.js"
import { getExtensions } from "./getExtensions.js"
import { markupPreprocessor } from "./markupPreprocessor.js"

export const svelteInMarkdown = (config: Partial<Config> = {}) => {
    const _config = {
        extensions: getExtensions(config.extensions),
        allowNodeModules: config.allowNodeModules ?? false,
        allowNodeModulesItems: config.allowNodeModulesItems ?? [],
    }

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(_config),
    } satisfies PreprocessorGroup
}
