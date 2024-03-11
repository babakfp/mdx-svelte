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
    // NOTE: I created this new variable because TypeScript is stupid and complains about types. We receive the expected values and their types by parsing, but when assigning the variable to the parsed result, TypeScript still complains that the values may be nullable.
    // NOTE: Added the explicit type because generating Valibot schema with TypeScript types is impossible. Some of the types are added the schema and some other by TypeScript. https://github.com/fabian-hiller/valibot/discussions/477
    const finalConfig: ConfigOutput = v.parse(ConfigSchema, config)

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(finalConfig, callbacks),
    } satisfies PreprocessorGroup
}
