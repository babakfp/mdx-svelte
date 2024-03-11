import type { PreprocessorGroup } from "svelte/compiler"
import * as v from "valibot"

import {
    type ConfigInput,
    type ConfigCallbacks,
    ConfigSchema,
    ConfigOutput,
} from "./types.js"
import { markupPreprocessor } from "./markupPreprocessor.js"

export const svelteInMarkdown = (
    config?: ConfigInput,
    callbacks?: ConfigCallbacks
) => {
    const finalConfig: ConfigOutput = v.parse(ConfigSchema, config)

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(finalConfig, callbacks),
    } satisfies PreprocessorGroup
}
