import * as v from "valibot"
import { DEFAULT_EXTENSIONS } from "./constants.js"

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
    }),
    {}
)

export type ConfigInput = v.Input<typeof ConfigSchema>
export type ConfigOutput = v.Output<typeof ConfigSchema>
