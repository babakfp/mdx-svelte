import * as v from "valibot"

import { CustomPluginsSchema } from "./CustomPluginsSchema.js"

export const RehypeMarkdownElementsSchema = v.optional(
    v.object(
        {
            /** Useful to add a plugin before or after this plugin. */
            plugins: CustomPluginsSchema,
        },
        v.unknown()
    ),
    {}
)
