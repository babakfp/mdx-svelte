import * as v from "valibot"
import type { Options } from "remark-frontmatter"

import { CustomPluginsSchema } from "./CustomPluginsSchema.js"

export const RemarkFrontmatterSchema = v.optional(
    v.object(
        {
            /** @default true */
            enable: v.optional(v.boolean(), true),

            /**
             * **Important**: Don't change!
             *
             * Only `"yaml"` is supported for now.
             */
            lang: v.optional(v.union([v.literal("yaml")]), "yaml"),

            options: v.optional(v.special<CustomOptions>(() => true)),

            /** Useful to add a plugin before or after this plugin. */
            plugins: CustomPluginsSchema,
        },
        v.unknown()
    ),
    {}
)

/**
 * A simplified version of the original option types of {@link Options}.
 * Some options are omitted for simplicity and readability.
 */
type CustomOptions = {
    /**
     * @default
     * { open: "---", close: "---" }
     */
    fence?: {
        /** @default "---" */
        close: string
        /** @default "---" */
        open: string
    }
}
