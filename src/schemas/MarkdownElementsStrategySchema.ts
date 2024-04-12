import * as v from "valibot"

export const MarkdownElementsStrategySchema = v.optional(
    v.union([v.literal("cheap"), v.literal("expensive")]),
    "cheap"
)
