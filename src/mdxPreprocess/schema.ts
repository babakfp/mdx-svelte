import { z } from "zod"
import { DOT_MD } from "../helpers/constants.js"

export const mdxPreprocessSchema = z
    .object({
        /**
         * @default
         * [".md", ".svelte.md"]
         */
        extensions: z
            .string({
                invalid_type_error:
                    "The property of `extensions` in the first argument of the `mdxPreprocess(options)` function, must be a string. Valid extensions are `.md` and `.svelte.md`.",
            })
            .regex(
                /^\.[a-z]+(\.[a-z]+)?$/,
                "The property of `extensions` in the first argument of the `mdxPreprocess(options)` function, received an invalid extension. Each extension must start with a dot and contain only lowercase letters. Valid extensions are `.md` and `.svelte.md`.",
            )
            .array()
            .min(
                1,
                "The property of `extensions` in the first argument of the `mdxPreprocess(options)` function, must contain at least one extension.",
            )
            .default([DOT_MD]),
        layouts: z
            .record(
                z
                    .string({
                        invalid_type_error:
                            "A layout name, in the property of `layouts` in the first argument of the `mdxPreprocess(options)` function, must be a string.",
                    })
                    .min(
                        1,
                        "A layout name, in the property of `layouts` in the first argument of the `mdxPreprocess(options)` function, must be a non-empty string.",
                    ),
                z
                    .string({
                        invalid_type_error:
                            "A custom element name, in the property of `layouts` in the first argument of the `mdxPreprocess(options)` function, must be a string.",
                    })
                    .regex(
                        /[a-z]/,
                        "A custom element name, in the property of `layouts` in the first argument of the `mdxPreprocess(options)` function, can't me empty and can only contain lowercase letters.",
                    )
                    .array(),
            )
            .optional(),
        preprocessDependencies: z
            .string({
                invalid_type_error:
                    "A dependency name, in the property of `preprocessDependencies` in the first argument of the `mdxPreprocess(options)` function, must be a string.",
            })
            .min(
                1,
                "A dependency name, in the property of `preprocessDependencies` in the first argument of the `mdxPreprocess(options)` function, must be a non-empty string.",
            )
            .array()
            .default([]),
    })
    .passthrough()
    .default({})
