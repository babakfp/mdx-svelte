import type { Root } from "hast"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"
import type { MdxPreprocessOptionsOutput } from "../../../mdxPreprocess/types.js"

export default (config: MdxPreprocessOptionsOutput): Transformer<Root> => {
    return (tree, file) => {
        const frontmatterLayout = file.data.frontmatter?.layout

        const elements = Array.isArray(config.elements)
            ? config.elements
            : frontmatterLayout && config.elements?.[frontmatterLayout]
              ? config.elements[frontmatterLayout]
              : []

        if (!elements.length) return

        visit(tree, "element", (node) => {
            if (elements.includes(node.tagName)) {
                node.tagName = `MdxElements.${node.tagName}`
            }
        })
    }
}
