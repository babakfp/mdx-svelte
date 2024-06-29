import { z } from "zod"

import { MARKDOWN_EXTENSIONS } from "../constants.js"

export const ConfigSchema = z
    .object({
        extensions: z
            .string()
            .regex(
                /^\.[a-z]+(\.[a-z]+)?$/,
                `Invalid file extension! Examples: ${JSON.stringify(
                    MARKDOWN_EXTENSIONS,
                )
                    .split(",")
                    .join(", ")}.`,
            )
            .array()
            .min(1)
            .default(MARKDOWN_EXTENSIONS),
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
