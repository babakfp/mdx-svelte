import * as v from "valibot"
import type { PreprocessorGroup } from "svelte/compiler"

import { ConfigSchema } from "./schemas/index.js"
import type { ConfigInput } from "./types/index.js"
import { markupPreprocessor } from "./markupPreprocessor.js"

export const svelteInMarkdownPreprocess = (config?: ConfigInput) => {
    const config_ = v.parse(ConfigSchema, config)

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(config_),
    } satisfies PreprocessorGroup
}
