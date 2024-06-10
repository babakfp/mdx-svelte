import * as v from "valibot"

import { MARKDOWN_EXTENSIONS } from "../constants.js"

export const ConfigSchema = v.optional(
    v.object(
        {
            extensions: v.optional(
                v.array(
                    v.string([
                        v.regex(
                            /^\.[a-z]+(\.[a-z]+)?$/,
                            `Invalid file extension! Examples: ${JSON.stringify(
                                MARKDOWN_EXTENSIONS,
                            )
                                .split(",")
                                .join(", ")}.`,
                        ),
                    ]),
                    [v.minLength(1)],
                ),
                MARKDOWN_EXTENSIONS,
            ),
            markdownElementsStrategy: v.optional(
                v.union([v.literal("cheap"), v.literal("expensive")]),
                "cheap",
            ),
            layouts: v.optional(
                v.record(v.array(v.string([v.regex(/[a-z]/)]))),
            ),
            nodeModules: v.optional(
                v.object({
                    ignore: v.optional(v.boolean(), true),
                    allowedDependencies: v.optional(
                        v.array(v.string([v.minLength(1)])),
                        [],
                    ),
                }),
                {},
            ),
        },
        // NOTE: Using this because of `ConfigCallbacks` in `/src/types/ConfigCallbacks.ts`.
        v.unknown(),
    ),
    {},
)
