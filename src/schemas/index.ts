import { z } from "zod"
import { DOT_MD, DOT_SVELTE_DOT_MD } from "../constants.js"

export const mdxSvelteSchema = z
    .object({
        extensions: z
            .string()
            .regex(
                /^\.[a-z]+(\.[a-z]+)?$/,
                `Invalid file extension! Examples: ["${DOT_MD}", "${DOT_SVELTE_DOT_MD}"].`,
            )
            .array()
            .min(1)
            .default([DOT_MD, DOT_SVELTE_DOT_MD]),
        markdownElementsStrategy: z
            .union([z.literal("cheap"), z.literal("expensive")])
            .default("cheap"),
        layouts: z
            .record(z.string().min(1), z.string().regex(/[a-z]/).array())
            .optional(),
        nodeModules: z
            .object({
                ignore: z.boolean().default(true),
                allowedDependencies: z.string().min(1).array().default([]),
            })
            .default({}),
    })
    .passthrough()
    .default({})
