import * as v from "valibot"
import type { PreprocessorGroup } from "svelte/compiler"

import { type ConfigInput, type ConfigOutput, ConfigSchema } from "./types.js"
import { markupPreprocessor } from "./markupPreprocessor.js"

export const svelteInMarkdown = (config?: ConfigInput) => {
    // TODO: [^1]
    const config_: ConfigOutput = v.parse(ConfigSchema, config)

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(config_),
    } satisfies PreprocessorGroup
}
