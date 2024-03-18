import * as v from "valibot"
import { parse } from "yaml"
import type { Transformer } from "unified"

export type YamlOptions = Parameters<typeof parse>[2]

const OptionsSchema = v.optional(
    v.object({
        name: v.optional(v.string([v.minLength(1)]), "frontmatter"),
        fence: v.optional(
            v.object({
                open: v.string(),
                close: v.string(),
            }),
            {
                open: "---",
                close: "---",
            }
        ),
        strip: v.optional(v.boolean(), true),
        yaml: v.optional(v.special<YamlOptions>(() => true)),
    }),
    {}
)

export type OptionsInput = v.Input<typeof OptionsSchema>
export type OptionsOutput = v.Output<typeof OptionsSchema>

export const remarkParseFrontmatterYaml = (
    options: OptionsInput
): Transformer => {
    const options_: OptionsOutput = v.parse(OptionsSchema, options)

    const regex = new RegExp(
        `^${options_.fence.open}(?:\r?\n|\r)(?:([\\s\\S]*?)(?:\r?\n|\r))?${options_.fence.close}(?:\r?\n|\r|$)`
    )

    return (_, file) => {
        const stringifiedFile = file.toString()

        const match = regex.exec(stringifiedFile)

        file.data[options_.name] = {}

        if (!match) return

        const frontmatterContent = match[1]
        const frontmatterContentWithFences = match[0]

        file.data[options_.name] = parse(frontmatterContent, options_.yaml)

        if (options_.strip) {
            file.value = stringifiedFile.slice(
                frontmatterContentWithFences.length
            )
        }
    }
}
