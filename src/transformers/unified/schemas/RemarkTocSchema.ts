import * as v from "valibot"
import type { Options } from "remark-toc"

import { CustomPluginsSchema } from "./CustomPluginsSchema.js"

// TODO: https://github.com/microsoft/TypeScript/issues/42873
import * as _ from "../../../../node_modules/.pnpm/mdast-util-toc@7.0.0/node_modules/mdast-util-toc/lib/index.js"

export const RemarkTocSchema = v.optional(
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
