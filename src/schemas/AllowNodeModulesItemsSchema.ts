import * as v from "valibot"

export const AllowNodeModulesItemsSchema = v.optional(
    v.array(v.string([v.minLength(1)])),
    []
)
