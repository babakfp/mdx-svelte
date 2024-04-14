import * as v from "valibot"
import type { Preset } from "unified"

export const getPluginBaseSchema = (
    options: Parameters<typeof v.object>[0]
) => {
    return v.optional(
        v.merge(
            [
                v.object(options),
                v.object({
                    /** Useful to add a plugin before or after this plugin. */
                    plugins: v.optional(
                        v.object(
                            {
                                /** Useful to add a plugin before this plugin. */
                                before: v.optional(
                                    v.special<Preset>(() => true)
                                ),

                                /** Useful to add a plugin after this plugin. */
                                after: v.optional(
                                    v.special<Preset>(() => true)
                                ),
                            },
                            v.never()
                        )
                    ),
                }),
            ],
            v.never()
        ),
        {}
    )
}
