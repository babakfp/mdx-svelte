import * as v from "valibot"
import type { Options } from "rehype-autolink-headings"

import { CustomPluginsSchema } from "./CustomPluginsSchema.js"

// TODO: https://github.com/microsoft/TypeScript/issues/42873
import * as _ from "../../../../node_modules/rehype-autolink-headings/lib/index.js"

export const RehypeAutolinkHeadingsSchema = v.optional(
    v.object(
        {
            /** @default false */
            enable: v.optional(v.boolean(), false),

            options: v.optional(v.special<Options>(() => true)),

            /** Useful to add a plugin before or after this plugin. */
            plugins: CustomPluginsSchema,
        },
        v.unknown()
    ),
    {}
)
