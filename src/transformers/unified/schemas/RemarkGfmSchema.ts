import * as v from "valibot"
import type { Options } from "remark-gfm"

import { CustomPluginsSchema } from "./CustomPluginsSchema.js"

// TODO: https://github.com/microsoft/TypeScript/issues/42873
import * as _ from "../../../../node_modules/remark-gfm/lib/index.js"

export const RemarkGfmSchema = v.optional(
    v.object(
        {
            /** @default true */
            enable: v.optional(v.boolean(), true),

            options: v.optional(v.special<Options>(() => true)),

            /** Useful to add a plugin before or after this plugin. */
            plugins: CustomPluginsSchema,
        },
        v.unknown()
    ),
    {}
)
