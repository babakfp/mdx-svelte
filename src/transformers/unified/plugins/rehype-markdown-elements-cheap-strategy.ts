import type { Transformer } from "unified"
import type { Root } from "hast"
import { visit } from "unist-util-visit"
import type { ConfigOutput } from "../../../types.js"

export default (config: ConfigOutput): Transformer<Root> => {
    return (tree, file) => {
        const frontmatterLayout = file.data.frontmatter?.layout
        const elements =
            (frontmatterLayout && config.layouts?.[frontmatterLayout]) ||
            config.layouts?.default

        if (!elements || !elements.length) return

        visit(tree, "element", (node) => {
            if (elements.includes(node.tagName)) {
                node.tagName = `MarkdownElements_.${node.tagName}`
            }
        })
    }
}
