import { z } from "zod"
import { DOT_MD } from "../helpers/constants.js"

/**
 * Example
 *
 * ```js
 * {
 *     elements: ["img"],
 * }
 * ```
 */
const elementSimpleSchema = z.string().min(1).array()

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
const elementAdvancedSchema = z
    .object({
        /** Component name. */
        tag: z.string().min(1),
        /**
         * [Which CSS selectors are allowed?](https://npmjs.com/package/hast-util-select#support)
         *
         * ## Examples
         *
         * - Block code: `"pre code"`.
         * - Inline code: `":not(pre) code"`.
         */
        selector: z.string().min(1),
    })
    .array()

const elementSchema = z.union([elementSimpleSchema, elementAdvancedSchema])

export const mdxPreprocessSchema = z
    .object({
        /**
         * @default
         * [".md", ".svelte.md"]
         */
        extensions: z
            .string()
            .regex(
                /^\.[a-z]+(\.[a-z]+)?$/,
                'Invalid. Examples: ".md", ".svelte.md"',
            )
            .array()
            .min(1)
            .default([DOT_MD]),
        elements: z
            .union([elementSchema, z.record(z.string().min(1), elementSchema)])
            .optional(),
        imports: z
            .object({
                context: z.literal("module").optional(),
                imports: z.string().startsWith("import").array().default([]),
            })
            .array()
            .default([]),
        preprocessDependencies: z.string().min(1).array().default([]),
    })
    .passthrough()
    .default({})
