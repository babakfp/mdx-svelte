import { z } from "zod"
import { DOT_MD } from "../helpers/constants.js"

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
        layouts: z
            .record(
                z.string().min(1),
                z
                    .string()
                    .min(1)
                    .regex(/[a-z]/, "Only lowercase letters")
                    .array()
                    .default([]),
            )
            .optional(),
        preprocessDependencies: z.string().min(1).array().default([]),
    })
    .passthrough()
    .default({})
