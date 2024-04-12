import * as v from "valibot"

import { DEFAULT_EXTENSIONS } from "../constants.js"

export const ExtensionsSchema = v.optional(
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
)
