import { z } from "zod"
import { DOT_MD } from "../helpers/constants.js"

const elementsArraySchema = z
    .union([
        z
            .string()
            .min(1)
            .regex(/^[a-z]+$/, "Only lowercase letters"),
        z.object({
            /** Component name */
            tag: z.string().min(1),
            /**
             * [CSS selector](https://www.npmjs.com/package/hast-util-select#support).
             * - Block code: `"pre code"`
             * - Inline code: `":not(pre) code"`
             */
            selector: z.string().min(1),
        }),
    ])
    .array()
    .default([])

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
            .union([
                elementsArraySchema,
                z.record(z.string().min(1), elementsArraySchema),
            ])
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
