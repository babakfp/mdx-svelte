import * as v from "valibot"
import type { Options } from "remark-frontmatter-yaml"

import { CustomPluginsSchema } from "./CustomPluginsSchema.js"

// TODO: https://github.com/microsoft/TypeScript/issues/42873
import * as _ from "../../../../node_modules/.pnpm/yaml@2.4.1/node_modules/yaml/dist/index.js"

export const RemarkFrontmatterYamlSchema = v.optional(
    v.object(
        {
            /** @default true */
            enable: v.optional(v.boolean(), true),

            options: v.optional(v.special<CustomOptions>(() => true)),

            /** Useful to add a plugin before or after this plugin. */
            plugins: CustomPluginsSchema,
        },
        v.unknown()
    ),
    {}
)

/**
 * A modified version of the original option types of {@link Options}.
 *
 * Some options (`"name"`) are omitted because they are required and should not modified!
 * Removed the `"name"` option for type-safety reasons.
 */
type CustomOptions = Omit<NonNullable<Options>, "name">
