import * as v from "valibot"
import { DOT_MD } from "../helpers/extensions.js"

/**
 * Example
 *
 * ```js
 * {
 *     elements: ["img"],
 * }
 * ```
 */
const elementSimpleSchema = v.array(v.pipe(v.string(), v.minLength(1)))

/**
 * Example
 *
 * ```js
 * {
 *     elements: [
 *         {
 *             tag: "MyBlockCode",
 *             selector: "pre code",
 *         },
 *     ],
 * }
 * ```
 */
const elementAdvancedSchema = v.array(
    v.object({
        /** Component name. */
        tag: v.pipe(v.string(), v.minLength(1)),
        /**
         * [Which CSS selectors are allowed?](https://npmjs.com/package/hast-util-select#support)
         *
         * ## Examples
         *
         * - Block code: `"pre code"`.
         * - Inline code: `":not(pre) code"`.
         */
        selector: v.pipe(v.string(), v.minLength(1)),
    }),
)

const elementSchema = v.union([elementSimpleSchema, elementAdvancedSchema])

export const mdxPreprocessSchema = v.looseObject({
    /**
     * @default
     * [".md", ".svelte.md"]
     */
    extensions: v.optional(
        v.pipe(
            v.array(
                v.pipe(
                    v.string(),
                    v.regex(
                        /^\.[a-z]+(\.[a-z]+)?$/,
                        'Invalid. Examples: ".md", ".svelte.md"',
                    ),
                ),
            ),
            v.minLength(1),
        ),
        [DOT_MD],
    ),
    elements: v.optional(
        v.union([
            elementSchema,
            v.record(v.pipe(v.string(), v.minLength(1)), elementSchema),
        ]),
    ),
    imports: v.optional(
        v.array(
            v.object({
                context: v.optional(v.pipe(v.string(), v.literal("module"))),
                imports: v.optional(
                    v.array(v.pipe(v.string(), v.startsWith("import"))),
                    [],
                ),
            }),
        ),
        [],
    ),
    preprocessDependencies: v.optional(
        v.array(v.pipe(v.string(), v.minLength(1))),
        [],
    ),
})
