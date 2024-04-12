import * as v from "valibot"

export const LayoutsSchema = v.optional(
    v.record(v.array(v.string([v.regex(/[a-z]/)])))
)
