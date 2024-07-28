import type { Root } from "hast"
import { selectAll } from "hast-util-select"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"
import type { MdxPreprocessOptionsOutput } from "../../../mdxPreprocess/types.js"

export default (options: MdxPreprocessOptionsOutput): Transformer<Root> => {
    return (tree, file) => {
        const frontmatterLayout = file.data.frontmatter?.layout

        const elements = Array.isArray(options.elements)
            ? options.elements
            : frontmatterLayout && options.elements?.[frontmatterLayout]
              ? options.elements[frontmatterLayout]
              : []

        if (!elements.length) return

        const simpleElements = elements.filter((el) => typeof el === "string")
        const advancedElements = elements.filter((el) => typeof el !== "string")

        advancedElements.forEach((el) => {
            const nodes = selectAll(el.selector, tree)

            nodes.forEach((node) => {
                node.tagName = `MdxElements.${el.tag}`
            })
        })

        visit(tree, "element", (node) => {
            if (simpleElements.includes(node.tagName)) {
                node.tagName = `MdxElements.${node.tagName}`
            }
        })
    }
}
