import * as v from "valibot"

import { CustomPluginsSchema } from "./CustomPluginsSchema.js"

export const RemarkUnwrapImagesSchema = v.optional(
    v.object(
        {
            /** @default true */
            enable: v.optional(v.boolean(), true),

            /** Useful to add a plugin before or after this plugin. */
            plugins: CustomPluginsSchema,
        },
        v.unknown()
    ),
    {}
)
