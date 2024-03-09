import type { PreprocessorGroup } from "svelte/compiler"
import * as v from "valibot"

import { type ConfigInput, ConfigSchema } from "./types.js"
import { markupPreprocessor } from "./markupPreprocessor.js"

export const svelteInMarkdown = (config?: ConfigInput) => {
    const finalConfig = v.parse(ConfigSchema, config)

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(finalConfig),
    } satisfies PreprocessorGroup
}
