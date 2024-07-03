import { z } from "zod"
import { DOT_MD } from "../helpers/constants.js"

const elementsArraySchema = z
    .string()
    .min(1)
    .regex(/[a-z]/, "Only lowercase letters")
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
        elements: elementsArraySchema
            .or(z.record(z.string().min(1), elementsArraySchema))
            .optional(),
        preprocessDependencies: z.string().min(1).array().default([]),
    })
    .passthrough()
    .default({})
