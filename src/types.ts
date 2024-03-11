import * as v from "valibot"
import type { RehypeShikiOptions } from "@shikijs/rehype"

import { DEFAULT_EXTENSIONS } from "./constants.js"

export type ConfigCallbacks = {
    /**
     * Callback function to determine whether a file should be ignored during preprocessing.
     * It runs after `allowNodeModules` and `allowNodeModulesItems`.
     * @param options - Options for the file preprocessing.
     * @param options.content - The content of the file.
     * @param options.filename - The name of the file.
     * @returns Return `true` to ignore the file, otherwise return `false`.
     */
    onFileIgnore?: (options: { content: string; filename: string }) => boolean
}

export const ConfigSchema = v.optional(
    v.object({
        extensions: v.optional(
            v.array(
                v.string([
                    v.minLength(1),
                    v.regex(
                        /^\.[a-z]+(\.[a-z]+)?$/,
                        `Invalid file extension! Valid examples: ${JSON.stringify(
                            DEFAULT_EXTENSIONS
                        )}.`
                    ),
                ]),
                [v.minLength(1)]
            ),
            DEFAULT_EXTENSIONS
        ),
        allowNodeModules: v.optional(v.boolean(), false),
        allowNodeModulesItems: v.optional(
            v.array(v.string([v.minLength(1)])),
            []
        ),
        builtInPlugins: v.optional(
            v.object({
                shiki: v.optional(
                    v.object({
                        enable: v.optional(v.boolean(), true),
                    }),
                    {}
                ),
            }),
            {}
        ),
    }),
    {}
)

export type ConfigInput = v.Input<typeof ConfigSchema> & {
    builtInPlugins?: {
        shiki?: {
            options?: RehypeShikiOptions
        }
    }
}
export type ConfigOutput = v.Output<typeof ConfigSchema> & {
    builtInPlugins: {
        shiki: {
            options?: RehypeShikiOptions
        }
    }
}
