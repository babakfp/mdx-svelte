import * as v from "valibot"
import type { RehypeShikiOptions } from "@shikijs/rehype"

import { CustomPluginsSchema } from "./CustomPluginsSchema.js"

export const RehypeShikiSchema = v.optional(
    v.object(
        {
            /** @default true */
            enable: v.optional(v.boolean(), true),

            options: v.optional(v.special<RehypeShikiOptions>(() => true)),

            /** Useful to add a plugin before or after this plugin. */
            plugins: CustomPluginsSchema,
        },
        v.unknown()
    ),
    {}
)
