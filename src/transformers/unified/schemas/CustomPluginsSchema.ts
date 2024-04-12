import * as v from "valibot"
import type { Preset } from "unified"

export const CustomPluginsSchema = v.optional(
    v.object(
        {
            /** Useful to add a plugin before this plugin. */
            before: v.optional(v.special<Preset>(() => true)),

            /** Useful to add a plugin after this plugin. */
            after: v.optional(v.special<Preset>(() => true)),
        },
        v.never()
    )
)
