import * as v from "valibot"

import { CustomPluginsSchema } from "./CustomPluginsSchema.js"

export const RehypeSanitizeCodeElementSchema = v.optional(
    v.object(
        {
            /** @readonly This plugin can't be disabled. */
            enable: v.optional(v.literal(true), true),

            /** Useful to add a plugin before or after this plugin. */
            plugins: CustomPluginsSchema,
        },
        v.unknown()
    ),
    {}
)
